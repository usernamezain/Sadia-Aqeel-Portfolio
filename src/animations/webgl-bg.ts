/**
 * WebGL Background Effect
 * Lightweight Three.js particle system for the hero section.
 * Uses instanced rendering for optimal GPU performance.
 */

import * as THREE from 'three';

export class WebGLBackground {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private animationId: number = 0;
  private mouse = { x: 0, y: 0 };
  private time = 0;

  constructor(container: HTMLElement) {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 50;

    // Renderer — use low power for battery saving
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(this.renderer.domElement);

    // Style the canvas
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '0';
    this.renderer.domElement.style.left = '0';
    this.renderer.domElement.style.pointerEvents = 'none';
    this.renderer.domElement.style.zIndex = '0';

    this.createParticles();
    this.addEventListeners(container);
  }

  private createParticles(): void {
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const accentColor = new THREE.Color('#e94560');
    const goldColor = new THREE.Color('#f0a500');
    const whiteColor = new THREE.Color('#ffffff');
    const colorChoices = [accentColor, goldColor, whiteColor];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute in a large sphere
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 60;

      // Random color from palette
      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private addEventListeners(container: HTMLElement): void {
    container.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / container.clientWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / container.clientHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  start(): void {
    const animate = () => {
      this.time += 0.001;

      // Gentle rotation
      this.particles.rotation.y = this.time * 0.5;
      this.particles.rotation.x = Math.sin(this.time * 0.3) * 0.1;

      // Mouse influence
      this.particles.rotation.y += this.mouse.x * 0.02;
      this.particles.rotation.x += this.mouse.y * 0.02;

      // Animate individual particles
      const positions = this.particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(this.time * 2 + positions[i] * 0.01) * 0.02;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;

      this.renderer.render(this.scene, this.camera);
      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  stop(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }
}
