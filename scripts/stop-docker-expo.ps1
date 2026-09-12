$root = Split-Path -Parent $PSScriptRoot
$runtimeFile = Join-Path $root '.expo-runtime\docker-processes.json'
if (Test-Path $runtimeFile) { (Get-Content $runtimeFile -Raw | ConvertFrom-Json).processes | ForEach-Object { Stop-Process -Id $_.pid -Force -ErrorAction SilentlyContinue }; Remove-Item $runtimeFile -Force }
& docker compose down
