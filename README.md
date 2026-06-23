# 🕵️‍♂️ Ask-Sherlock: AI Landing Page

¡Bienvenido al repositorio oficial de **Ask-Sherlock**! Esta es una landing page interactiva, inmersiva y de alto rendimiento que demuestra el poder de los **Usuarios Sintéticos** impulsados por Inteligencia Artificial para la investigación UX/UI.

A través de simulaciones en tiempo real, físicas complejas en Canvas y un asistente virtual integrado, esta plataforma no solo *explica* el producto, sino que lo **demuestra** directamente al visitante.

---

## ✨ Características Principales

1. 🌌 **Físicas y Partículas Interactivas:**
   - Motores de renderizado en HTML5 Canvas (`StarfieldBackground`, `ParticleCanvas`, `Medusae`).
   - Fondos espaciales que reaccionan de manera fluida a la posición del cursor con efectos de repulsión gravitacional, ondas de choque e inercia.

2. 🤖 **Sherlock Bot (Asistente Integrado):**
   - Un robot asistente flotante inteligente (`FloatingRobot.jsx`) anclado en la vista.
   - Cuenta con una interfaz de chat interactiva que asiste a los usuarios respondiendo dudas en tiempo real con un tono persuasivo.

3. 💬 **Motor Sintético Interactivo (Simulador de Entrevistas):**
   - Una demostración en vivo (`SyntheticSimulator.jsx`) en bucle continuo.
   - Simula chats 1 a 1 con múltiples perfiles de usuarios (ej. *Millennial Compradora*, *Abuelo Tech*, *Director TI*), mostrando cómo la plataforma se adapta a variables sociodemográficas y psicográficas reales.

4. ⚡ **Rendimiento Extremo (Lazy Loading):**
   - Implementación de intersecciones (`useInView`) y Code-Splitting (`React.lazy`, `Suspense`).
   - Todos los componentes y scripts interactivos bajo el pliegue (below the fold) se cargan de forma diferida únicamente cuando el usuario desliza la pantalla hacia ellos, asegurando una carga inicial instantánea.

5. 🌊 **Marquesina Gravitacional de Marcas:**
   - Un carrusel infinito de clientes (`Clients.jsx`) con un patrón orgánico de flotación senoidal que aporta credibilidad sin aburrir a nivel visual.

---

## 🛠️ Tecnologías Utilizadas

- **Core:** React 18 + Vite (Entorno de desarrollo super-rápido)
- **Estilos UI:** Vanilla CSS (Glassmorphism, mallas gradientes, variables CSS nativas)
- **Animaciones e Interacciones:** Framer Motion (Transiciones de orquestación, aparición escalonada)
- **Efectos Visuales:** JS nativo con `requestAnimationFrame` en elementos `<canvas>`

---

## 🚀 Instalación y Ejecución Local

Si deseas clonar y correr este proyecto en tu entorno local, sigue estos pasos:

### 1. Clonar el repositorio
Abre tu terminal y ejecuta:
```bash
git clone https://github.com/asksherlock/sherlock.git
cd sherlock
```

### 2. Instalar dependencias
Asegúrate de tener Node.js instalado. Instala las dependencias necesarias de npm:
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
Levanta el servidor local de Vite con el siguiente comando:
```bash
npm run dev
```
La aplicación estará disponible inmediatamente en `http://localhost:5173`. Todos los cambios se reflejarán instantáneamente gracias al Hot Module Replacement (HMR).

---

## 📂 Arquitectura Principal

El diseño del proyecto es modular y cada componente de la Landing Page está desacoplado:

- `/src/LandingPage.jsx` - Componente raíz que orquesta la carga diferida (Lazy Loading) y posiciona las capas espaciales.
- `/src/components/` - Todos los bloques visuales funcionales.
  - `SyntheticSimulator.jsx` - Motor del chat con bucles infinitos de pruebas.
  - `FloatingRobot.jsx` - El asistente flotante anclado en pantalla.
  - `Hero.jsx`, `CTA.jsx`, `Pricing.jsx`, `Features.jsx` - Secciones descriptivas de la página.
- `/src/components/medusae/` - Motores de física de enjambre de partículas en Canvas.

---

## 🤝 Contribución
Siéntete libre de inspeccionar el código, abrir un *Issue* o enviar un *Pull Request* si encuentras áreas de mejora (¡especialmente en el rendimiento del canvas!).

## 📄 Licencia
Este proyecto es propiedad de **Innogyzer** y Ask-Sherlock. Todos los derechos reservados.
