import {Action} from '@/@types/global';
import Painter from '@/modules/Painter';
import Rasterizer from '@/modules/Rasterizer';

/**
 * Render Loop per vsync
 */
export default class Renderer {
  private painter: Painter;
  private rasterizer: Rasterizer;
  private actionQueue: Action[];
  private flag: boolean;

  constructor(
    painter: Painter,
    rasterizer: Rasterizer,
  ) {
    this.painter = painter;
    this.rasterizer = rasterizer;
    this.actionQueue = [];
    this.flag = false;
    this.startLoop();
  }

  public render(action: Action): void {
    this.actionQueue.push(action);
  }

  public startLoop() {
    this.flag = true;
    window.requestAnimationFrame(this.animate);
  }

  public stopLoop() {
    this.flag = false;
  }

  private readonly animate = () => {
    this.actionQueue.forEach((action) => this.painter.paint(action));
    this.actionQueue = [];
    this.rasterizer.rasterize();
    if (this.flag) {
      window.requestAnimationFrame(this.animate);
    }
  }
}
