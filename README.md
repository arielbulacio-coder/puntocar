# Punto Car 🚗
Proyecto PWA Full Stack para la compra y venta de autos usados, inspirado en la estética de Kavak.

## Características
- **PWA**: Instalable en dispositivos móviles y de escritorio.
- **Frontend**: React + Tailwind CSS + Framer Motion (Animaciones premium).
- **Backend**: Node.js + Express + Sequelize (SQLite para simulación sencilla).
- **Auth**: JWT con login de admin.
- **Moderno**: Diseño responsivo y oscuro/claro inspirado en Kavak.
- **GitHub Actions**: Despliegue automático de la interfaz en GitHub Pages.

## Tecnologías
- **Client**: Vite, React 18, Tailwind CSS, Lucide React, Framer Motion.
- **Server**: Express, Sequelize, JWT, Bcrypt.
- **DB**: SQLite (fácil de probar sin dependencias externas).

## Estructura del Proyecto
- `/client`: Frontend de la aplicación.
- `/server`: Backend API.

## Cómo empezar
### Local
1. Clonar el repo: `git clone https://github.com/arielbulacio-coder/puntocar.git`
2. Instalar dependencias en ambas carpetas.
3. Iniciar el servidor: `cd server && npm start`
4. Iniciar el cliente: `cd client && npm run dev`

### Producción (GitHub Pages)
El frontend se despliega automáticamente en GitHub Pages usando GitHub Actions. El backend deberá ser alojado por separado o simulado (actualmente tiene un fallback de datos en el cliente).

## Credenciales de prueba
- **User**: admin@puntocar.com
- **Pass**: admin123
