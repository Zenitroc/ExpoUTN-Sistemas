# ExpoUTN · Sistemas

Experiencia interactiva para explorar la carrera de Ingeniería en Sistemas de Información.

## Principios de interacción (obligatorios)

Este sitio se diseña como una experiencia de pantalla completa, no como una página web convencional. Toda modificación debe conservar estas reglas:

- No debe requerir scroll vertical ni horizontal: la información de cada vista debe caber en pantalla y organizarse en estados, pestañas o pantallas breves.
- La permanencia del cursor sobre un elemento interactivo debe activar la acción luego del tiempo configurado (`dwellDurationSeconds`). Debe haber progreso visual de esa permanencia.
- El clic directo sigue habilitado en todos los controles. La activación por permanencia complementa al clic; no lo reemplaza.
- Los controles interactivos deben funcionar tanto con el cursor físico como con la entrada de cursor externo prevista por `InputProvider`.
- Las nuevas secciones deben ser concisas, visuales y navegables por estados; no se deben convertir en listados largos ni en documentos desplazables.
- Si se agregan enlaces externos, deben poder abrirse tanto por clic como por permanencia del cursor.

## Validación mínima

Antes de entregar cambios de interfaz, ejecutar:

```bash
npm run build
npm run lint
```
