# Frontend CELEX en Render

## Regla obligatoria para rutas Angular (evita "Not Found")

En Render → **celex-frontend** → **Redirects/Rewrites** → **Add Rule**:

| Campo | Valor |
|-------|--------|
| **Source** | `/*` |
| **Destination** | `/index.html` |
| **Action** | **Rewrite** |

Guarda y redeploy.

Sin esta regla, `/alumnos` y `/alumnoForm` dan 404.

## Build en Render

- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist/angular-frases/browser`
