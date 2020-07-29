import Renderer from './modules/Renderer';
import Trigger from './modules/Trigger';
import {Viewport, IntializeOptions} from './@types/global';

/**
 * Entry Module
 */
export default class Boardy {
  private viewport: Viewport;
  public renderer: Renderer;
  public trigger: Trigger;

  constructor(options: IntializeOptions = {
    containerElement: null,
  }) {
    this.viewport = this.createViewport(options);
    this.renderer = new Renderer(this.viewport);
    this.trigger = new Trigger(this.viewport);
  }

  private createViewport(options?: IntializeOptions): Viewport {
    const id: string = options.id || 'boardy';
    const containerElement: Element = options.containerElement ||
      window.document.body;
    const size: [number, number] = options.size || [500, 500];
    const resolution: [number, number] = options.resolutionWidth ?
      [options.resolutionWidth, (options.resolutionWidth / size[0]) * size[1]] :
      [100000, (100000 / size[0]) * size[1]];
    const unit: number = size[0] > size[1] ?
      resolution[1] / size[1] :
      resolution[0] / size[0];

    return {
      id,
      containerElement,
      svgElement: this.createSvgElement(id, containerElement, size, resolution),
      size,
      resolution,
      unit,
    };
  }

  private createSvgElement(
    id: string,
    containerElement: Element,
    size: [number, number],
    resolution: [number, number],
  ) {
    if (!containerElement) {
      throw new Error('container element is required !');
    }

    const attrs: string[] = [
      'xmlns="http://www.w3.org/2000/svg"',
      'xmlns:xlink="http://www.w3.org/1999/xlink"',
      `id="${id}"`,
      `width="${size[0]}"`,
      `height="${size[1]}"`,
      `viewBox="0 0 ${resolution[0]} ${resolution[1]}"`,
    ];
    const svgHtml: string = `<svg ${attrs.join(' ')}></svg>`;

    containerElement.insertAdjacentHTML('beforeend', svgHtml);

    return document.querySelector(`#${id}`);
  }
}
