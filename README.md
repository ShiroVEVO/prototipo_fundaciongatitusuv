# Ronroneo — Landing page

Prototipo de página web en React (Vite) para la Fundación Gatitus UV.

## Instalar y correr

```bash
npm install
npm run dev
```

## Estructura

```
src/
  components/
    Hero.jsx          Banner 100vh con video/imagen de fondo
    StatsCounter.jsx   Contador animado (Adoptables / Dados en adopción / Impacto)
    CatCard.jsx         Tarjeta individual de gato
    CatCarousel.jsx     Carrusel infinito de gatos en adopción
    RescueSection.jsx   Sección "Rescate" (agrupa stats + carrusel)
    CafeSection.jsx      Sección "Cafetería" (mapa + frase)
    HelpCard.jsx          Tarjeta de "otras formas de ayudar"
    HelpSection.jsx        Sección de las 4 formas de ayudar
    Footer.jsx              Redes, contacto y navegación
  data/
    cats.js               Datos mock de gatos (reemplazable a futuro)
  App.jsx
  index.css
```

## Cosas para personalizar antes de publicar

- **Hero**: reemplaza `VIDEO_SRC` y `POSTER_SRC` en `Hero.jsx` por tu video/imagen real (colócalo en `public/media/`).
- **Mapa**: reemplaza `MAP_EMBED_SRC` en `CafeSection.jsx` por el iframe que te da Google Maps (Compartir → Insertar un mapa).
- **Gatos**: edita `src/data/cats.js` o conéctalo a tu API/CMS.
- **Enlaces internos** (`/hogar-de-paso`, `/voluntariado`, `/donar`, `/apadrinar`): si usas react-router, cambia las etiquetas `<a>` por `<Link>` de `react-router-dom`.
- **Cifras de impacto**: ajusta los `value` en `RescueSection.jsx`.


