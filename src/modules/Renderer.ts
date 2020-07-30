import Drawer from './Drawer';
import {Viewport, Action} from '@/@types/global';
import Shape from './Shape';

/**
 * Rendering on svg element by action
 */
export default class Renderer {
  private drawer: Drawer;
  private actionQueue: Action[];
  private flag: boolean;

  constructor(viewport: Viewport, shape: Shape) {
    this.drawer = new Drawer(viewport, shape);
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
    this.actionQueue.forEach((action) => this.drawer.draw(action));
    this.actionQueue = [];
    if (this.flag) {
      window.requestAnimationFrame(this.animate);
    }
  }
}
