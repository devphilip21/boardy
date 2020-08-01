import {Context} from '@/@types/global';

export default class Rasterizer {
  private context: Context;

  constructor(context: Context) {
    this.context = context;
  }

  public rasterize() {
    this.context.ctx.screen.drawImage(this.context.canvas.offscreen, 0, 0);
  }
}
