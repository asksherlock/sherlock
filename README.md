# 🕵️‍♂️ Ask-Sherlock: AI Landing Page

Una landing page interactiva, inmersiva y futurista para **Ask-Sherlock**, la plataforma que te permite descubrir fricciones en tu producto en minutos interactuando con **Usuarios Sintéticos** impulsados por Inteligencia Artificial.

Construida con **React**, **Vite** y **Framer Motion**, esta página no solo explica el producto, sino que lo *demuestra* en tiempo real integrando la **API de Google Gemini**.

---

## ✨ Características Principales

- 🌌 **Físicas y Partículas Interactivas:** Fondos espaciales desarrollados en HTML5 Canvas (`StarfieldBackground`, `ParticleCanvas`) que reaccionan a la posición del cursor con efectos de repulsión gravitacional y ondas de choque.
- 🤖 **Sherlock Bot (Asistente de Ventas):** Un robot flotante interactivo (`FloatingRobot.jsx`) conectado directamente al cerebro de Gemini. Actúa como el mejor vendedor de la plataforma, respondiendo dudas en tiempo real con una personalidad persuasiva.
- 💬 **Simulador de Usuarios Sintéticos:** Una demostración en vivo (`SyntheticSimulator.jsx`) donde puedes chatear 1 a 1 con perfiles de usuarios generados por IA (ej. "Millennial Compradora", "Abuelo Tech") para simular entrevistas de UX. El bot adopta la personalidad de forma dinámica.
- 🌊 **Marquesina Gravitacional:** Carrusel infinito de marcas de clientes (`Clients.jsx`) con movimiento orgánico de flotación (onda senoidal) y escalado dinámico.

---

## 🛠️ Tecnologías Utilizadas

- **Core:** React 18 + Vite
- **Estilos:** Vanilla CSS moderno (Glassmorphism, gradientes radiales, variables CSS)
- **Animaciones:** Framer Motion (Transiciones de montaje, orquestación de UI)
- **Inteligencia Artificial:** `@google/genai` (SDK Oficial para Gemini 2.5 Flash)

---

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para correr el proyecto en tu máquina:

### 1. Clonar el repositorio
```bash
git clone https://github.com/asksherlock/sherlock.git
cd sherlock
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar la API de Inteligencia Artificial
Tanto el robot flotante como el simulador de chat requieren una API Key de Google Gemini para funcionar.
Crea un archivo llamado `.env` en la raíz del proyecto (al mismo nivel que `package.json`) y añade tu clave:
```env
VITE_GEMINI_API_KEY=Pega_aqui_tu_clave_de_API
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible localmente en `http://localhost:5173`.

---

## 📂 Arquitectura Principal

- `/src/components` - Todos los bloques visuales de la página.
  - `SyntheticSimulator.jsx` - Motor del chat de demostración con inyección de *System Prompts* dinámicos.
  - `FloatingRobot.jsx` - Componente inteligente con historial de conversación.
  - `StarfieldBackground.jsx` / `ParticleCanvas.jsx` - Motores de renderizado de Canvas para físicas en 60fps.
- `/public/logos` - Archivos originales y logotipos de clientes.

---

## 🔒 Notas de Seguridad Importantes
El archivo `.env` está **excluido intencionalmente** del control de versiones (mediante `.gitignore`) para evitar que tu clave secreta de Gemini quede expuesta públicamente en GitHub. **Nunca subas este archivo a repositorios públicos.**
