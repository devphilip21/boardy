import {Context} from '@/@types/base';

// TODO: use Web Worker in browsers that support OffscreenCanvas
export default class Rasterizer {
  private context: Context;

  constructor(context: Context) {
    this.context = context;
  }

  public rasterize() {
    this.clear();
    this.context.ctx.screen.drawImage(
      this.context.canvas.offscreen,
      0,
      0,
      this.context.resolution.width,
      this.context.resolution.height,
      0,
      0,
      this.context.size.width,
      this.context.size.height,
    );
  }

  public clear() {
    this.context.ctx.screen.clearRect(
      0,
      0,
      this.context.resolution.width,
      this.context.resolution.height,
    );
  }
}
