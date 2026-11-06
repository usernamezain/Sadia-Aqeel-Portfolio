---
name: matter-physics-shapes
description: "Teaches AI agents how to implement interactive 2D Matter.js physics arenas with dropping, colliding, drag-and-drop shapes, collision color flash effects, and viewport triggers in modern web applications."
---

# Matter.js Physics Shapes & Interactive Canvas Skill

This skill provides a complete blueprint and instructions for building interactive 2D physics arenas using **Matter.js** in modern web applications (Astro, React, Vite, HTML/JS).

## Overview

The interactive physics arena allows geometric shapes (Circles, Flowers, Cubes, Rounded Cubes, Cylinders/Pills) to:
1. **Drop from above** when the section scrolls into the viewport under physics gravity.
2. **Collide & Flash**: Change color dynamically and flash an outline glow upon hitting each other or boundary walls.
3. **Drag & Drop**: Allow users to grab, toss, throw, and stack shapes with real-time mouse/touch physics.
4. **Preserve Scroll**: Retain standard page touch/mouse scrolling without blocking document scroll events.

---

## 1. Dependencies

Install `matter-js` and its TypeScript definitions:

```bash
npm install matter-js @types/matter-js
```

---

## 2. Supported Shapes & Matter.js Geometry Definitions

| Shape | Geometry Function | Key Properties |
| :--- | :--- | :--- |
| **Circle** | `Bodies.circle(x, y, radius)` | `restitution: 0.78, friction: 0.1` |
| **Flower** | `Bodies.polygon(x, y, 6, radius)` | `restitution: 0.75, chamfer: { radius: 10 }` |
| **Cube** | `Bodies.rectangle(x, y, size, size)` | `restitution: 0.7, friction: 0.2` |
| **Rounded Cube** | `Bodies.rectangle(x, y, size, size)` | `chamfer: { radius: 16 }, restitution: 0.75` |
| **Cylinder / Pill** | `Bodies.rectangle(x, y, width, height)` | `chamfer: { radius: height / 2 }, restitution: 0.8` |

---

## 3. Architecture & Implementation Steps

### Step A: Canvas & Engine Initialization

```typescript
import Matter from 'matter-js';

const { Engine, Bodies, Composite, Mouse, MouseConstraint, Events, Body } = Matter;

const card = document.getElementById('physics-card');
const canvas = document.getElementById('physics-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let width = card.clientWidth;
let height = card.clientHeight;

canvas.width = width;
canvas.height = height;

// Create Engine & World Gravity
const engine = Engine.create();
engine.gravity.y = 1.1;

// Define Arena Boundaries (Ground, Left Wall, Right Wall)
const ground = Bodies.rectangle(width / 2, height + 40, width * 3, 80, { isStatic: true });
const wallLeft = Bodies.rectangle(-40, height / 2, 80, height * 3, { isStatic: true });
const wallRight = Bodies.rectangle(width + 40, height / 2, 80, height * 3, { isStatic: true });

Composite.add(engine.world, [ground, wallLeft, wallRight]);
```

---

### Step B: Color Palette & Collision Flash System

Attach custom metadata properties (`colorIndex`, `flashVal`, `shapeType`) to each physics body:

```typescript
const palette = ['#92D68A', '#37481A', '#B5DDF0', '#F3EBC0', '#C86D51', '#759D42', '#172408'];

// Listen for Collision Events
Events.on(engine, 'collisionStart', (evt) => {
  evt.pairs.forEach(pair => {
    const bA = pair.bodyA as any;
    const bB = pair.bodyB as any;

    if (bA.shapeType) {
      bA.colorIndex = (bA.colorIndex + 1) % palette.length;
      bA.flashVal = 1.0;
    }
    if (bB.shapeType) {
      bB.colorIndex = (bB.colorIndex + 1) % palette.length;
      bB.flashVal = 1.0;
    }
  });
});
```

---

### Step C: Drag & Drop Mouse Constraint (Non-Blocking Scroll)

```typescript
const mouse = Mouse.create(canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: { stiffness: 0.2, render: { visible: false } }
});

// Remove default wheel event prevention so normal page scrolling works
// @ts-ignore
mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
// @ts-ignore
mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

Composite.add(engine.world, mouseConstraint);
```

---

### Step D: Viewport Drop Trigger

Use `IntersectionObserver` to trigger shape dropping from above when scrolling into view:

```typescript
let spawned = false;

function spawnShapes() {
  if (spawned) return;
  spawned = true;

  const shapeTypes = ['circle', 'flower', 'cube', 'roundedcube', 'cylinder'];

  shapeTypes.forEach((type, idx) => {
    const startX = (width * 0.1) + ((width * 0.8) / shapeTypes.length) * idx;
    const startY = -80 - idx * 60; // Spawn offscreen above viewport

    const body = createShape(type, startX, startY);
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.15);
    Composite.add(engine.world, body);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) spawnShapes();
  });
}, { threshold: 0.15 });

observer.observe(card);
```

---

### Step E: Custom Canvas Rendering Loop

```typescript
function renderLoop() {
  requestAnimationFrame(renderLoop);

  Engine.update(engine, 1000 / 60);
  ctx.clearRect(0, 0, width, height);

  bodiesList.forEach(b => {
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);

    // Fade flash intensity
    if (b.flashVal > 0) b.flashVal -= 0.03;

    ctx.fillStyle = palette[b.colorIndex];
    ctx.strokeStyle = b.flashVal > 0.1 ? '#FFFFFF' : 'rgba(23, 36, 8, 0.2)';
    ctx.lineWidth = b.flashVal > 0.1 ? 3 + b.flashVal * 4 : 1.5;

    // Draw Shape Geometry
    if (b.shapeType === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, b.shapeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (b.shapeType === 'flower') {
      drawFlower(ctx, b.shapeRadius);
    } else if (b.shapeType === 'roundedcube' || b.shapeType === 'cube') {
      ctx.beginPath();
      ctx.roundRect(-b.shapeW / 2, -b.shapeH / 2, b.shapeW, b.shapeH, 16);
      ctx.fill();
      ctx.stroke();
    } else if (b.shapeType === 'cylinder') {
      ctx.beginPath();
      ctx.roundRect(-b.shapeW / 2, -b.shapeH / 2, b.shapeW, b.shapeH, b.shapeH / 2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  });
}

renderLoop();
```

---

## Best Practices & Gotchas

1. **Touch & Scroll Compatibility**: Always remove default `mousewheel` listeners from `Matter.Mouse` so scrolling on mobile devices works without lag.
2. **Viewport Optimization**: Use `IntersectionObserver` so physics simulations only compute when visible.
3. **Responsive Boundaries**: Update ground and side wall positions on window `resize` events to keep shapes bounded.
4. **Collision Palette Cycling**: Use integer index modulo operations (`(colorIndex + 1) % palette.length`) for predictable color cycling.
