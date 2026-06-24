# 🕵️‍♂️ Sherlock AI - Full Stack Platform

Sherlock AI es una plataforma moderna construida con una arquitectura Full-Stack que combina un frontend interactivo y rápido con un sistema de gestión de contenido (CMS) robusto y altamente personalizado.

## 🚀 Tecnologías Principales

*   **Frontend**: React + Vite
*   **Backend / CMS**: Payload CMS 3.0 (Next.js App Router)
*   **Base de Datos**: PostgreSQL (alojada en Supabase)
*   **Estilos**: Diseño Neumórfico / Glassmorphism con Vanilla CSS

## ✨ Características Destacadas

1.  **Frontend Ultra Rápido**
    *   Landing page optimizada con efectos visuales modernos.
    *   Rutas dinámicas para el Blog que consumen la API REST del CMS.
    *   Diseño responsivo y amigable para el usuario.
2.  **Panel de Administración Inteligente (Custom Dashboard)**
    *   Panel de Payload CMS totalmente re-diseñado con la identidad visual de "Ask Sherlock".
    *   **Dashboard Estadístico en Tiempo Real**: Tarjetas con efecto neón que muestran la cantidad de artículos, servicios, usuarios y el estado del sistema.
    *   Organización de colecciones modular (System, Content, Business).
3.  **Control de Versiones y Borradores (Estilo Google Docs)**
    *   Todas las colecciones principales (Artículos, Servicios, Portafolios) cuentan con sistema de versiones.
    *   Capacidad de guardar "Borradores" (Drafts) sin publicarlos al frontend.
    *   Historial completo de ediciones para restaurar versiones pasadas.
4.  **Base de Datos en Supabase (IPv4 Session Pooling)**
    *   Conexión estable utilizando el *Session Pooler* de Supavisor (puerto 5432).
    *   Garantiza máxima compatibilidad con redes y frameworks modernos.

## 📦 Estructura del Proyecto

El repositorio está dividido en dos partes fundamentales:

*   `/` (Directorio Raíz): Contiene el código del Frontend (Vite + React). Aquí se manejan los componentes visuales de la landing page y el renderizado del blog.
*   `/cms`: Contiene el Backend (Payload CMS 3.0). Es un proyecto de Next.js independiente que administra la base de datos y provee las APIs de contenido.

## 🛠️ Instalación y Uso Local

Para levantar el proyecto en tu entorno local, necesitas tener instalado Node.js (v18+).

### 1. Clonar el repositorio
```bash
git clone https://github.com/asksherlock/sherlock.git
cd sherlock
```

### 2. Configurar Variables de Entorno
Dentro de la carpeta `cms/`, debes tener un archivo `.env` con las siguientes credenciales (asegúrate de colocar las tuyas):

```env
DATABASE_URI=postgresql://[usuario]:[password]@[pooler-url].supabase.com:5432/postgres
PAYLOAD_SECRET=tu-secreto-super-seguro
```

### 3. Instalar Dependencias y Arrancar
Hemos configurado un script global que levantará **ambos servidores al mismo tiempo** (Frontend en el puerto `5173` y Backend en el puerto `4000`).

Desde la raíz del proyecto, ejecuta:
```bash
npm install
npm run dev:all
```

*   **Frontend**: `http://localhost:5173`
*   **Panel CMS**: `http://localhost:4000/admin`
*   **API del CMS**: `http://localhost:4000/api`

---
*Desarrollado con ❤️ para Sherlock AI.*
