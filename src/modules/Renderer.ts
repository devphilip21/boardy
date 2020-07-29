import Drawer from './Drawer';
import {NS_SVG} from '@/constants/markup';
import * as T from '@/constants/action';

/**
 * Rendering on svg element by action
 */
export default class Renderer {
  private containerElement: Element;
  private drawer: Drawer;
  /**
   * Constructor
   * @param {Element} containerElement : element to render
   * @param {[number, number]} resolutionPowers: resolution(power of 10)
   *   (recommended: [5, 5])
   */
  constructor(
    id: string,
    containerElement: Element,
    size: [number, number],
    resolutionPowers: [number, number],
  ) {
    const attrs: string[] = [
      'xmlns="http://www.w3.org/2000/svg"',
      'xmlns:xlink="http://www.w3.org/1999/xlink"',
      `id="${id}"`,
    ];
    const svgHtml: string = `<svg ${attrs.join(' ')}></svg>`;

    this.containerElement = containerElement;
    this.containerElement.insertAdjacentHTML('beforeend', svgHtml);

    const svgElement = document.querySelector(`#${id}`);

    this.drawer = new Drawer(svgElement, size, resolutionPowers);
  }

  public render(action: T.Action): void {
    // TODO: render loop
    this.drawer.draw(action);
  }
}
