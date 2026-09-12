$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$tracker = Join-Path $root 'ExpoUTN-HandTracking'
$python = Join-Path $tracker '.venv\Scripts\python.exe'
$output = Join-Path $root 'release\hand-tracker'

if (-not (Test-Path -LiteralPath $python)) { throw "No se encontró $python. Creá primero el entorno del tracker." }
& $python -m PyInstaller --version | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Host 'Instalando PyInstaller para preparar el ejecutable...'
  & $python -m pip install pyinstaller
  if ($LASTEXITCODE -ne 0) { throw 'No se pudo instalar PyInstaller.' }
}
& $python -m PyInstaller --noconfirm --clean --onedir --name hand_cursor --distpath $output --workpath (Join-Path $tracker 'build') --specpath $tracker --collect-all mediapipe --collect-all cv2 --collect-all pyautogui (Join-Path $tracker 'hand_cursor.py')
if ($LASTEXITCODE -ne 0) { throw 'Falló el empaquetado del tracker.' }
Write-Host "Tracker portable creado en $output\hand_cursor\hand_cursor.exe"
