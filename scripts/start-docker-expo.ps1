$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$runtime = Join-Path $root '.expo-runtime'
$runtimeFile = Join-Path $runtime 'docker-processes.json'
$tracker = Join-Path $root 'release\hand-tracker\hand_cursor\hand_cursor.exe'
$settings = Join-Path $root '.expo-config\settings.json'
$url = 'http://127.0.0.1:4173'

if (Test-Path -LiteralPath $runtimeFile) { throw 'La experiencia Docker ya está iniciada. Ejecutá stop-expo.cmd.' }
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) { throw 'No se encontró Docker Desktop. Instalalo e iniciá Docker Desktop.' }
& docker info *> $null
if ($LASTEXITCODE -ne 0) { throw 'Docker Desktop está instalado pero no está iniciado. Abrilo y esperá a que el motor quede activo.' }
if (-not (Test-Path -LiteralPath $tracker)) { throw "No se encontró el tracker portable: $tracker. Ejecutá scripts\build-tracker.ps1 en la máquina de armado." }

& docker compose up --detach
if ($LASTEXITCODE -ne 0) { throw 'Docker Compose no pudo iniciar la web.' }
$deadline = (Get-Date).AddSeconds(90); $ready = $false
while ((Get-Date) -lt $deadline -and -not $ready) { try { $ready = (Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2).StatusCode -eq 200 } catch { Start-Sleep -Milliseconds 700 } }
if (-not $ready) { & docker compose down; throw 'La web Docker no respondió.' }

$camera = 0
if (Test-Path -LiteralPath $settings) { try { $camera = [int]((Get-Content $settings -Raw | ConvertFrom-Json).cameraIndex) } catch {} }
$trackerProcess = Start-Process -FilePath $tracker -ArgumentList @('--no-preview', '--camera', $camera) -WorkingDirectory (Split-Path $tracker) -WindowStyle Hidden -PassThru
$chrome = @("$env:ProgramFiles\Google\Chrome\Application\chrome.exe", "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe", "$env:LocalAppData\Google\Chrome\Application\chrome.exe", "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe", "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe") | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1
$processes = @([pscustomobject]@{ name = 'tracker'; pid = $trackerProcess.Id })
if ($chrome) { $browser = Start-Process -FilePath $chrome -ArgumentList @('--kiosk', '--no-first-run', '--autoplay-policy=no-user-gesture-required', $url) -PassThru; $processes += [pscustomobject]@{ name = 'chrome'; pid = $browser.Id } } else { Start-Process $url }
New-Item -ItemType Directory -Force -Path $runtime | Out-Null
[pscustomobject]@{ processes = $processes } | ConvertTo-Json -Depth 3 | Set-Content $runtimeFile -Encoding utf8
Write-Host "Expo Docker lista en $url (cámara $camera)"
