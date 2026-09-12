$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$runtimeDir = Join-Path $root '.expo-runtime'
$runtimeFile = Join-Path $runtimeDir 'processes.json'

if (-not (Test-Path -LiteralPath $runtimeFile)) { Write-Host 'No hay una sesión Expo registrada.'; exit 0 }
try {
  $runtime = Get-Content -LiteralPath $runtimeFile -Raw | ConvertFrom-Json
  foreach ($item in $runtime.processes) {
    if (Get-Process -Id $item.pid -ErrorAction SilentlyContinue) {
      Stop-Process -Id $item.pid -Force -ErrorAction SilentlyContinue
      Write-Host "Detenido: $($item.name)"
    }
  }
} finally { Remove-Item -LiteralPath $runtimeDir -Recurse -Force -ErrorAction SilentlyContinue }
