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
4.  **Base de Datos Segura y Aislada en Supabase**
    *   Se utiliza un **esquema personalizado** (`schemaName: 'sherlock'`) para que las tablas de Sherlock no se mezclen ni sobreescriban otras tablas en la base de datos pública compartida.
    *   Preparado para trabajar con **S3 Storage** para que las imágenes se guarden directamente en un Bucket de Supabase.

## 📦 Estructura del Proyecto

El repositorio está dividido en dos partes fundamentales:

*   `/` (Directorio Raíz): Contiene el código del Frontend (Vite + React). Aquí se manejan los componentes visuales de la landing page y el renderizado del blog.
*   `/cms`: Contiene el Backend (Payload CMS 3.0). Es un proyecto de Next.js independiente que administra la base de datos y provee las APIs de contenido.

## 🛠️ Instalación y Uso Local

Sigue estas instrucciones paso a paso para reproducir el proyecto en una computadora nueva:

### 1. Requisito de Red (Para Windows)
Supabase ha migrado sus conexiones directas a **IPv6**. Si tu proveedor de internet local o tu computadora no soportan IPv6 nativo, el backend no podrá conectarse a la base de datos.
**Solución:** Descarga e instala [Cloudflare WARP (1.1.1.1)](https://1.1.1.1/). Actívalo antes de iniciar el servidor para obtener soporte IPv6 de forma mágica y gratuita.

### 2. Clonar el repositorio
```bash
git clone https://github.com/asksherlock/sherlock.git
cd sherlock
```

### 3. Configurar Variables de Entorno
Dentro de la carpeta `cms/`, debes duplicar el archivo `.env.example` y renombrarlo a `.env`. Asegúrate de rellenarlo con las credenciales correctas:

```env
# Conexión directa a la base de datos Supabase (Requiere IPv6 o WARP)
DATABASE_URI=postgresql://[usuario]:[password]@db.[project-ref].supabase.co:5432/postgres

# Secreto de encriptación de Payload CMS
PAYLOAD_SECRET=un-secreto-super-seguro

# Supabase Storage (S3) Configuration para imágenes
S3_ENDPOINT=https://[PROJECT_ID].supabase.co/storage/v1/s3
S3_BUCKET=sherlock-media
S3_ACCESS_KEY_ID=tu-access-key
S3_SECRET_ACCESS_KEY=tu-secret-key
S3_REGION=auto
```

### 4. Instalar Dependencias y Arrancar
Hemos configurado un script global que instalará y levantará **ambos servidores al mismo tiempo** (Frontend en el puerto `5173` o `5174` y Backend en el puerto `4000`).

Desde la raíz del proyecto, ejecuta:
```bash
# Instala las dependencias principales
npm install

# Instala las dependencias del CMS
cd cms && npm install && cd ..

# Arranca ambos entornos en paralelo
npm run dev:all
```

*   **Frontend**: `http://localhost:5173` (o 5174 si el puerto está en uso)
*   **Panel CMS**: `http://localhost:4000/admin`
*   **API del CMS**: `http://localhost:4000/api`

---
*Desarrollado con ❤️ para Sherlock AI.*
