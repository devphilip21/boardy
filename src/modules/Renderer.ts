import Drawer from './Drawer';
import * as T from '@/constants/action';
import {Viewport, Action} from '@/@types/global';

/**
 * Rendering on svg element by action
 */
export default class Renderer {
  private drawer: Drawer;

  constructor(viewport: Viewport) {
    this.drawer = new Drawer(viewport);
  }

  public render(action: Action): void {
    // TODO: render loop
    this.drawer.draw(action);
  }
}
