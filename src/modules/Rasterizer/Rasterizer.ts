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
      this.context.resolution[0],
      this.context.resolution[1],
      0,
      0,
      this.context.size[0],
      this.context.size[1],
    );
  }

  public clear() {
    this.context.ctx.screen.clearRect(
      0,
      0,
      this.context.resolution[0],
      this.context.resolution[1],
    );
  }
}
