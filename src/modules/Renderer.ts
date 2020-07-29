import Drawer from './Drawer';
import {Viewport, Action} from '@/@types/global';
import Shape from './Shape';

/**
 * Rendering on svg element by action
 */
export default class Renderer {
  private drawer: Drawer;

  constructor(viewport: Viewport, shape: Shape) {
    this.drawer = new Drawer(viewport, shape);
  }

  public render(action: Action): void {
    // TODO: render loop
    this.drawer.draw(action);
  }
}
