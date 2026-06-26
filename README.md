<div align="center">
  <h1>Sherlock AI - Website Ecosystem</h1>
  <p><strong>Transformando la investigación de usuarios con Inteligencia Artificial</strong></p>
</div>

---

## 🚀 Overview

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
    *   Ver repositorio del CMS para detalles: [ask_sherlock_cms](https://github.com/asksherlock/ask_sherlock_cms)

## 📦 Estructura del Proyecto

El repositorio está dedicado exclusivamente al Frontend (Vite + React). Aquí se manejan los componentes visuales de la landing page y el renderizado del blog y testimonios.

## 🛠️ Instalación y Uso Local

Sigue estas instrucciones paso a paso para reproducir el proyecto en una computadora nueva:

### 1. Clonar el repositorio
```bash
git clone https://github.com/asksherlock/sherlock.git
cd sherlock
```

### 2. Configuración del Frontend (Website)

Crea un archivo `.env` en la raíz del proyecto para conectar tu frontend con el CMS local. (Si no creas este archivo, la web intentará buscar la API en producción):

```env
VITE_CMS_URL=http://localhost:4000/api
```

### 3. Instalar Dependencias y Arrancar
Desde la raíz del proyecto, ejecuta:
```bash
npm install
npm run dev
```

*   **Frontend**: `http://localhost:5173` (o 5174 si el puerto está en uso)

---

## 🎨 Principios de Diseño (UI/UX)
El frontend de Sherlock AI sigue un conjunto estricto de reglas de diseño para transmitir innovación y confianza:
- **Colores:** Fondo galáctico oscuro con acentos en azul eléctrico (`#1a5cff`) y tonos violetas.
- **Glassmorphism:** Tarjetas y contenedores con desenfoque de fondo y bordes de cristal (`backdrop-blur-md border border-white/10`).
- **Tipografía:** Uso de la fuente 'Inter' para máxima legibilidad, con encabezados de alto contraste y gradientes lineales (`text-transparent bg-clip-text bg-gradient-to-r`).
- **Animaciones:** Reveal de texto progresivo, efectos de hover suaves, y una estela de estrellas interactiva en el Hero Section.

---

<div align="center">
  <em>Desarrollado para Sherlock AI.</em>
</div>
