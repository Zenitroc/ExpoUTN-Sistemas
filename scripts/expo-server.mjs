import { createServer } from 'node:http'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { resolve, extname, join } from 'node:path'

const args = process.argv.slice(2)
const value = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback
const port = Number(value('--port', '4173'))
const root = resolve(value('--root', 'dist'))
const configFile = resolve(value('--config', '.expo-config/settings.json'))
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4', '.vtt': 'text/vtt' }

async function readSettings() { try { return JSON.parse(await readFile(configFile, 'utf8')) } catch { return {} } }
async function sendFile(response, requested) {
  const safePath = resolve(root, `.${decodeURIComponent(requested)}`)
  const file = safePath.startsWith(root) ? safePath : join(root, 'index.html')
  try { const info = await stat(file); if (!info.isFile()) throw new Error(); response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' }); response.end(await readFile(file)) }
  catch { const index = join(root, 'index.html'); response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); response.end(await readFile(index)) }
}

createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host}`)
  if (url.pathname === '/expo-config/camera') {
    if (request.method === 'GET') { response.writeHead(200, { 'Content-Type': 'application/json' }); response.end(JSON.stringify(await readSettings())); return }
    if (request.method === 'POST') {
      let body = ''; for await (const chunk of request) body += chunk
      const data = JSON.parse(body || '{}'); const cameraIndex = Number(data.cameraIndex)
      if (!Number.isInteger(cameraIndex) || cameraIndex < 0 || cameraIndex > 32) { response.writeHead(400); response.end('cameraIndex inválido'); return }
      await mkdir(resolve(configFile, '..'), { recursive: true }); await writeFile(configFile, JSON.stringify({ cameraIndex }, null, 2)); response.writeHead(204); response.end(); return
    }
  }
  await sendFile(response, url.pathname === '/' || !extname(url.pathname) ? '/index.html' : url.pathname)
}).listen(port, '127.0.0.1', () => console.log(`Expo local: http://127.0.0.1:${port}`))
