# Angular Frases

Proyecto Angular con navegación, calculadora y CRUD de frases (como en clase).

## Requisitos

- Node.js 18+ con npm instalado ([nodejs.org](https://nodejs.org))

## Instalación

```bash
cd C:\Users\alexa\Projects\angular-frases
npm install
```

## Ejecutar

```bash
npm start
```

Abre [http://localhost:4200](http://localhost:4200).

## Rutas

| Ruta | Componente |
|------|------------|
| `/home` | Bienvenida |
| `/operaciones` | Calculadora |
| `/frases` | Lista de frases |
| `/frasesForm` | Crear frase |
| `/frasesForm/:id` | Editar frase |

## Estructura

- `src/app/header` — barra de navegación con Bootstrap
- `src/app/home` — pantalla de bienvenida
- `src/app/operaciones` — sumar, restar, multiplicar, dividir
- `src/app/frases/lista-frases` — listado
- `src/app/frases/frases-form` — formulario crear/editar
- `src/app/model/frase.ts` — interfaz del modelo
