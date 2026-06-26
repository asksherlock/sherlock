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
    *   Rutas dinámicas para el Blog que consumen la API REST del CMS y parsean el contenido Lexical (Rich Text).
    *   Sección interactiva de "Testimonios" que consume directamente del CMS.
2.  **Panel de Administración Inteligente (Custom Dashboard)**
    *   Panel de Payload CMS totalmente re-diseñado con la identidad visual de "Ask Sherlock".
    *   **Dashboard Estadístico en Tiempo Real**: Tarjetas con efecto neón que muestran la cantidad de artículos, testimonios, usuarios y el estado del sistema.
    *   Organización modular unificada: Todas las configuraciones principales viven bajo el grupo "Sistema".
3.  **Control de Versiones y Borradores (Estilo Google Docs)**
    *   Todas las colecciones de contenido cuentan con sistema de versiones.
    *   Capacidad de guardar "Borradores" (Drafts) sin publicarlos al frontend.
    *   Historial completo de ediciones para restaurar versiones pasadas.
4.  **Backend Separado (API First)**
    *   La plataforma consume el contenido desde un CMS headless.
    *   Ver repositorio del CMS para detalles: [sherlock-cms](https://github.com/ivaninnogyzer/sherlock-cms)

## 📦 Estructura del Proyecto

El repositorio está dedicado exclusivamente al Frontend (Vite + React). Aquí se manejan los componentes visuales de la landing page y el renderizado del blog y testimonios.

## 🛠️ Instalación y Uso Local

Sigue estas instrucciones paso a paso para reproducir el proyecto en una computadora nueva:

### 1. Clonar el repositorio
```bash
git clone https://github.com/asksherlock/sherlock.git
cd sherlock
```

### 2. Configurar Variables de Entorno (Opcional)
Si el Frontend requiere conectarse a un CMS local en lugar del de producción, puedes configurar la URL de la API (por defecto apunta a `http://localhost:4000`).

### 3. Instalar Dependencias y Arrancar
Desde la raíz del proyecto, ejecuta:
```bash
npm install
npm run dev
```

*   **Frontend**: `http://localhost:5173` (o 5174 si el puerto está en uso)

---
*Desarrollado con ❤️ para Sherlock AI.*
