/**
 * Canvas / 2D Drawing Utilities
 * Smooth wavy lines, wiggly strokes, and organic shapes.
 * Uses vanilla Canvas API for zero-dependency 2D art.
 */

/** Point interface for line drawing */
interface Point {
  x: number;
  y: number;
}

/**
 * Draw a smooth wavy line across the canvas.
 * Creates an organic, hand-drawn feel.
 */
export function drawWavyLine(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  amplitude = 20,
  frequency = 0.02,
  phase = 0
): void {
  ctx.beginPath();
  ctx.moveTo(startX, startY);

  const dx = endX - startX;
  const dy = endY - startY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  const steps = Math.ceil(length / 2);

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const dist = t * length;
    const wave = Math.sin(dist * frequency + phase) * amplitude;

    const x = startX + Math.cos(angle) * dist - Math.sin(angle) * wave;
    const y = startY + Math.sin(angle) * dist + Math.cos(angle) * wave;

    ctx.lineTo(x, y);
  }

  ctx.stroke();
}

/**
 * Draw a wiggly/squiggly stroke between two points.
 * More chaotic than wavy — feels hand-drawn.
 */
export function drawWigglyStroke(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  wiggleAmount = 5
): void {
  if (points.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    const cp1x = points[i - 1].x + (Math.random() - 0.5) * wiggleAmount * 2;
    const cp1y = points[i - 1].y + (Math.random() - 0.5) * wiggleAmount * 2;
    const cp2x = points[i].x + (Math.random() - 0.5) * wiggleAmount * 2;
    const cp2y = points[i].y + (Math.random() - 0.5) * wiggleAmount * 2;

    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, points[i].x, points[i].y);
  }

  ctx.stroke();
}

/**
 * Organic blob shape generator.
 * Creates smooth, blobby shapes for background decoration.
 */
export function drawBlob(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  irregularity = 0.3,
  numPoints = 8,
  phase = 0
): void {
  ctx.beginPath();

  const angleStep = (Math.PI * 2) / numPoints;

  for (let i = 0; i <= numPoints; i++) {
    const angle = i * angleStep + phase;
    const r = radius + Math.sin(angle * 3 + phase) * radius * irregularity;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      const prevAngle = (i - 1) * angleStep + phase;
      const prevR = radius + Math.sin(prevAngle * 3 + phase) * radius * irregularity;
      const prevX = centerX + Math.cos(prevAngle) * prevR;
      const prevY = centerY + Math.sin(prevAngle) * prevR;

      const cpx = (prevX + x) / 2 + (Math.random() - 0.5) * 20;
      const cpy = (prevY + y) / 2 + (Math.random() - 0.5) * 20;

      ctx.quadraticCurveTo(cpx, cpy, x, y);
    }
  }

  ctx.closePath();
}

/**
 * Animated flowing lines background.
 * Creates multiple flowing lines that animate smoothly.
 */
export class FlowingLines {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private lines: Array<{ points: Point[]; speed: number; color: string; width: number }> = [];
  private animationId: number = 0;
  private phase = 0;

  constructor(canvas: HTMLCanvasElement, lineCount = 5) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.initLines(lineCount);
  }

  private initLines(count: number): void {
    const colors = [
      'rgba(233, 69, 96, 0.15)',
      'rgba(240, 165, 0, 0.1)',
      'rgba(255, 255, 255, 0.05)',
      'rgba(233, 69, 96, 0.08)',
      'rgba(240, 165, 0, 0.06)',
    ];

    for (let i = 0; i < count; i++) {
      const points: Point[] = [];
      const numPoints = 6;

      for (let j = 0; j < numPoints; j++) {
        points.push({
          x: (this.canvas.width / (numPoints - 1)) * j,
          y: this.canvas.height * (0.3 + Math.random() * 0.4),
        });
      }

      this.lines.push({
        points,
        speed: 0.005 + Math.random() * 0.01,
        color: colors[i % colors.length],
        width: 1 + Math.random() * 2,
      });
    }
  }

  start(): void {
    const animate = () => {
      this.phase += 0.01;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.lines.forEach((line) => {
        this.ctx.strokeStyle = line.color;
        this.ctx.lineWidth = line.width;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        const animatedPoints = line.points.map((p, i) => ({
          x: p.x,
          y: p.y + Math.sin(this.phase * (1 + i * 0.3) + i) * 30,
        }));

        this.ctx.beginPath();
        this.ctx.moveTo(animatedPoints[0].x, animatedPoints[0].y);

        for (let i = 1; i < animatedPoints.length - 1; i++) {
          const xc = (animatedPoints[i].x + animatedPoints[i + 1].x) / 2;
          const yc = (animatedPoints[i].y + animatedPoints[i + 1].y) / 2;
          this.ctx.quadraticCurveTo(animatedPoints[i].x, animatedPoints[i].y, xc, yc);
        }

        this.ctx.stroke();
      });

      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  stop(): void {
    cancelAnimationFrame(this.animationId);
  }

  resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }
}

/**
 * Noise grain texture generator.
 * Creates a subtle film-grain overlay.
 */
export function generateNoiseTexture(
  canvas: HTMLCanvasElement,
  opacity = 0.03
): void {
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const value = Math.random() * 255;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = opacity * 255;
  }

  ctx.putImageData(imageData, 0, 0);
}
