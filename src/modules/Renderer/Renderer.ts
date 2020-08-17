import {Action} from '@/@types/base';
import Painter from '@/modules/Painter';
import Rasterizer from '@/modules/Rasterizer';

/**
 * Render Loop per vsync
 */
export default class Renderer {
  private painter: Painter;
  private rasterizer: Rasterizer;
  private actionQueue: Action[];
  private isRunning: boolean;

  constructor(
    painter: Painter,
    rasterizer: Rasterizer,
  ) {
    this.painter = painter;
    this.rasterizer = rasterizer;
    this.actionQueue = [];
    this.isRunning = false;
  }

  public render(action: Action): void {
    this.actionQueue.unshift(action);
    if (!this.isRunning) {
      window.requestAnimationFrame(this.animate);
    }
  }

  private readonly animate = () => {
    // if actionQueue is empty, stop animation
    if (this.actionQueue.length === 0) {
      this.isRunning = false;
      return;
    }

    // do animation
    while (this.actionQueue.length > 0) {
      const action = this.actionQueue.pop();

      if (action) {
        this.painter.paint(action);
      }
    }
    this.rasterizer.rasterize();

    // next vsync tick
    window.requestAnimationFrame(this.animate);
  }
}
