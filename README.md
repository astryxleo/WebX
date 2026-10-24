# WebX® — Immersive Creative Portfolio

A dark, editorial portfolio starter built with React, Vite, Tailwind CSS, React Three Fiber, Drei, Framer Motion and Lucide.

## Features

- Obsidian canvas, subtle grain texture, mint ambient accent and oversized kinetic typography.
- Animated percentage preloader with an explicit **Enter Experience** action.
- Responsive React Three Fiber scene: mouse-reactive wireframe torus knot and a lightweight particle field.
- Spring-smoothed custom cursor on fine pointers; native cursor remains available on touch devices.
- Draggable horizontal project showcase with spring momentum, pointer tilt and CSS-built artwork.
- About, services and contact sections, responsive layouts and reduced-motion support.
- IST clock in the navigation; sound toggle is a UI placeholder and does not play audio.

## Run locally

Requires Node.js 18.18+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Create a production build with `npm run build` and preview it using `npm run preview`.

## Structure

```text
src/
  components/
    CanvasBackground.jsx
    CustomCursor.jsx
    Hero.jsx
    Navbar.jsx
    Preloader.jsx
    ProjectCarousel.jsx
  App.jsx
  main.jsx
  styles.css
index.html
vite.config.js
tailwind.config.js
postcss.config.js
```

## Customize

- Replace the project data and CSS artwork in `ProjectCarousel.jsx` with your own case studies and images.
- Update the contact email, social links and copy in `App.jsx`.
- Change the accent token `--mint` in `src/styles.css` and `signal` in `tailwind.config.js`.
- The sound button is intentionally visual-only until you connect a real audio interaction.

## Performance notes

The WebGL canvas uses a capped device-pixel ratio and low-power GPU preference. The background scene is decorative and doesn't intercept pointer events. For further optimization, consider pausing the canvas when the tab is hidden, using static fallbacks for low-end devices, and profiling on real mobile hardware before adding heavier post-processing.

## Deployment

Import the repository into Vercel (or another static hosting provider). The default Vite build output is `dist`; no server environment variables are required.
