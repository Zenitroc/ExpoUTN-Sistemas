# ExpoUTN · Sistemas

Experiencia interactiva para explorar Ingeniería en Sistemas de Información. La interfaz se controla con cursor y permanencia (dwell): funciona tanto con mouse como con la mano detectada por webcam, sin clicks automáticos.

## Guía rápida para la Expo

En una PC preparada para la muestra, con Docker Desktop iniciado, webcam conectada y Chrome o Edge instalado:

```powershell
.\start-expo.cmd
```

El comando inicia la web, el hand tracking y el navegador en modo kiosco. No requiere instalar Node, npm, Python, pip, MediaPipe ni ejecutar comandos manuales de Vite.

Para detener solamente los procesos de esta experiencia:

```powershell
.\stop-expo.cmd
```

La web queda disponible en `http://127.0.0.1:4173`.

## Elegir la cámara

Con la web iniciada, abrí `http://127.0.0.1:4173/config` en un navegador, tocá **Detectar cámaras**, autorizá el acceso y seleccioná la cámara deseada. Al guardar, la selección se persiste en `.expo-config/settings.json`.

Reiniciá la experiencia para que el tracker use la nueva cámara:

```powershell
.\stop-expo.cmd
.\start-expo.cmd
```

El índice de la cámara también se puede definir manualmente durante desarrollo:

```powershell
npm run all -- -Camera 1
```

Si Windows cambia el orden de las webcams, repetí la detección antes de la Expo.

## Qué se distribuye

La entrega debe incluir todo este proyecto y, especialmente, la carpeta generada:

```text
release/
└── hand-tracker/
    └── hand_cursor/
        └── hand_cursor.exe
```

El ejecutable incluye Python, MediaPipe, OpenCV y PyAutoGUI. Corre de forma nativa porque necesita acceder a la webcam y mover el cursor real de Windows; Docker se usa únicamente para la web.

## Preparar la entrega (PC de armado)

Requisitos de la PC de armado: Node LTS, Python 3.11, Docker Desktop y el entorno de `ExpoUTN-HandTracking` instalado.

```powershell
npm install
powershell -ExecutionPolicy Bypass -File .\scripts\build-tracker.ps1
docker compose build
```

El tracker portable queda en `release\hand-tracker\hand_cursor\hand_cursor.exe`.

Para preparar también una imagen web utilizable sin conexión, exportala junto a la entrega:

```powershell
docker save -o .\release\expoutn-sistemas-web.tar expoutn-sistemas-web:latest
```

En la PC de Expo, antes de iniciar por primera vez y sin conexión a Internet:

```powershell
docker load -i .\release\expoutn-sistemas-web.tar
```

Después, `start-expo.cmd` funciona sin descargar paquetes de npm, Python ni imágenes Docker.

## Desarrollo normal

```powershell
npm install
npm run dev
```

Comandos disponibles:

```powershell
npm run build       # genera dist/
npm run preview     # prueba el build local
npm run lint
npm run all         # sitio + tracker + Chrome kiosco, sin Docker
npm run all:dev     # Vite + tracker + Chrome normal
npm run all:web     # sólo sitio local, sin tracker
npm run all:stop
```

`npm run build` genera `dist/`, apto para desplegar como sitio estático.

## Tracker en modo desarrollo

Instalación inicial (una sola vez) del tracker:

```powershell
cd .\ExpoUTN-HandTracking
& "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe" -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
cd ..
```

Modo debug con ventana y teclas `q`, `p` y `d`:

```powershell
.\ExpoUTN-HandTracking\.venv\Scripts\python.exe .\ExpoUTN-HandTracking\hand_cursor.py
```

Modo Expo sin ventana OpenCV:

```powershell
.\ExpoUTN-HandTracking\.venv\Scripts\python.exe .\ExpoUTN-HandTracking\hand_cursor.py --no-preview
```

Opciones: `--expo`, `--camera 0`, `--no-mouse` y `--mirror`.

## Diagnóstico

- **Docker no inicia:** abrí Docker Desktop y esperá a que el motor esté activo; luego ejecutá `start-expo.cmd` otra vez.
- **No se encuentra `hand_cursor.exe`:** en la PC de armado ejecutá `scripts\build-tracker.ps1` y entregá la carpeta `release` completa.
- **La webcam incorrecta se abre:** configurala desde `/config`, guardá y reiniciá.
- **Sin conexión en la Expo:** cargá previamente `release\expoutn-sistemas-web.tar` con `docker load`.
- **No se detecta mano:** verificá permisos de cámara de Windows, que ninguna otra aplicación la esté usando y que la cámara seleccionada sea la correcta.
