# ExpoUTN · Sistemas

Experiencia interactiva para explorar Ingeniería en Sistemas de Información.

## Interacción

La interfaz se controla por cursor y permanencia (dwell): no requiere clicks. El mouse físico y el hand tracking usan el mismo `pointermove` del navegador, por lo que nodos, botones, modal, carruseles y protector de pantalla funcionan igual en ambos casos.

El cursor visual propio del sitio se mantiene y el cursor nativo queda oculto sobre la experiencia.

## Desarrollo web

```powershell
npm install
npm run dev
```

Comandos útiles:

```powershell
npm run build
npm run preview
npm run lint
```

`npm run build` genera `dist/`, listo para desplegar como sitio estático.

## Experiencia completa / Expo

El tracker vive dentro de este repositorio:

```text
ExpoUTN-Sistemas/
├── ExpoUTN-HandTracking/
│   ├── hand_cursor.py
│   └── .venv/
└── scripts/
```

Instalación inicial del tracker, una sola vez (desde `ExpoUTN-HandTracking`, usando Python 3.11):

```powershell
cd .\ExpoUTN-HandTracking
& "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe" -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
cd ..
```

### Expo / kiosco

```powershell
npm run all
```

Compila el sitio, lo sirve solo en `http://127.0.0.1:4173`, espera a que responda, inicia el tracking con `--no-preview` y abre Chrome en modo kiosco.

### Elegir cámara

Abrí `http://127.0.0.1:4173/config`, elegí **Detectar cámaras**, autorizá el navegador y seleccioná la cámara. Al guardar, la elección se almacena localmente en `.expo-config/settings.json`; reiniciá la experiencia con `npm run all` para que el tracker use esa cámara.

También se puede elegir de forma puntual desde consola:

```powershell
npm run all -- -Camera 1
```

El índice se corresponde con el listado de `/config`. Si Windows cambia el orden de sus dispositivos, verificá la selección nuevamente antes de la Expo.

### Desarrollo con tracking

```powershell
npm run all:dev
```

Usa `http://127.0.0.1:5173` y abre Chrome normal.

### Solo web

```powershell
npm run all:web
```

### Detener la experiencia

```powershell
npm run all:stop
```

Los procesos creados se registran en `.expo-runtime/processes.json`; el comando de detención finaliza únicamente esos PID.

## Tracker

Modo normal con preview y teclas de depuración:

```powershell
.\ExpoUTN-HandTracking\.venv\Scripts\python.exe .\ExpoUTN-HandTracking\hand_cursor.py
```

Modo Expo sin ventana OpenCV:

```powershell
.\ExpoUTN-HandTracking\.venv\Scripts\python.exe .\ExpoUTN-HandTracking\hand_cursor.py --no-preview
```

También admite `--expo`, `--camera 0`, `--no-mouse` y `--mirror`.
