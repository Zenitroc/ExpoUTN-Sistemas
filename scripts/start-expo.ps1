[CmdletBinding()]
param([switch]$Dev, [switch]$NoTracking, [switch]$NoBrowser, [int]$Camera = -1)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$runtimeDir = Join-Path $root '.expo-runtime'
$runtimeFile = Join-Path $runtimeDir 'processes.json'
$trackerRoot = Join-Path $root 'ExpoUTN-HandTracking'
$configDir = Join-Path $root '.expo-config'
$configFile = Join-Path $configDir 'settings.json'
$port = if ($Dev) { 5173 } else { 4173 }
$url = "http://127.0.0.1:$port"
$started = @()

function Find-Chrome {
  @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:LocalAppData\Google\Chrome\Application\chrome.exe"
  ) | Where-Object { $_ -and (Test-Path -LiteralPath $_) } | Select-Object -First 1
}

if (Test-Path -LiteralPath $runtimeFile) { throw 'Ya hay una sesión Expo activa. Ejecutá npm run all:stop.' }
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) { throw 'No se encontró Node.js.' }
$viteEntry = Join-Path $root 'node_modules\vite\bin\vite.js'
$expoServer = Join-Path $root 'scripts\expo-server.mjs'
if ($Dev -and -not (Test-Path -LiteralPath $viteEntry)) { throw 'No se encontró Vite. Ejecutá npm install.' }

$trackerPython = Join-Path $trackerRoot '.venv\Scripts\python.exe'
$trackerScript = Join-Path $trackerRoot 'hand_cursor.py'
if (-not $NoTracking) {
  if (-not (Test-Path -LiteralPath $trackerScript)) { throw "No se encontró $trackerScript" }
  if (-not (Test-Path -LiteralPath $trackerPython)) { throw "No se encontró el entorno del tracker: $trackerPython. Ver ExpoUTN-HandTracking/README.md." }
}

New-Item -ItemType Directory -Force -Path $runtimeDir, $configDir | Out-Null
try {
  if (-not $Dev) {
    Write-Host 'Compilando sitio...'
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) { throw 'Falló npm run build.' }
  }

  $viteArgs = if ($Dev) { @($viteEntry, '--host', '127.0.0.1', '--port', '5173', '--strictPort') } else { @($expoServer, '--port', '4173', '--root', (Join-Path $root 'dist'), '--config', $configFile) }
  $web = Start-Process -FilePath $node.Source -ArgumentList $viteArgs -WorkingDirectory $root -WindowStyle Hidden -PassThru
  $started += [pscustomobject]@{ name = 'web'; pid = $web.Id }

  $deadline = (Get-Date).AddSeconds(45)
  $ready = $false
  while ((Get-Date) -lt $deadline -and -not $ready) {
    try { $ready = (Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2).StatusCode -eq 200 } catch { Start-Sleep -Milliseconds 500 }
  }
  if (-not $ready) { throw "El sitio no respondió en 45 segundos: $url" }

  if (-not $NoTracking) {
    $cameraIndex = $Camera
    if ($cameraIndex -lt 0 -and (Test-Path -LiteralPath $configFile)) {
      try { $cameraIndex = [int]((Get-Content -LiteralPath $configFile -Raw | ConvertFrom-Json).cameraIndex) } catch { $cameraIndex = -1 }
    }
    $trackerArgs = @('hand_cursor.py', '--no-preview')
    if ($cameraIndex -ge 0) { $trackerArgs += @('--camera', $cameraIndex); Write-Host "Tracker usando cámara $cameraIndex" }
    $tracker = Start-Process -FilePath $trackerPython -ArgumentList $trackerArgs -WorkingDirectory $trackerRoot -WindowStyle Hidden -PassThru
    $started += [pscustomobject]@{ name = 'tracker'; pid = $tracker.Id }
  }

  if (-not $NoBrowser) {
    $chrome = Find-Chrome
    if ($chrome) {
      $chromeArgs = if ($Dev) { @('--autoplay-policy=no-user-gesture-required', $url) } else { @('--kiosk', '--no-first-run', '--autoplay-policy=no-user-gesture-required', $url) }
      $browser = Start-Process -FilePath $chrome -ArgumentList $chromeArgs -PassThru
      $started += [pscustomobject]@{ name = 'chrome'; pid = $browser.Id }
    } else { Write-Warning 'No se encontró Chrome; se abrirá el navegador predeterminado.'; Start-Process $url }
  }

  [pscustomobject]@{ url = $url; mode = if ($Dev) { 'dev' } else { 'expo' }; processes = $started } | ConvertTo-Json -Depth 3 | Set-Content -LiteralPath $runtimeFile -Encoding utf8
  Write-Host "Experiencia lista: $url"
} catch {
  $started | ForEach-Object { Stop-Process -Id $_.pid -Force -ErrorAction SilentlyContinue }
  Remove-Item -LiteralPath $runtimeDir -Recurse -Force -ErrorAction SilentlyContinue
  throw
}
