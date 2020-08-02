import Trigger from './modules/Trigger';
import Renderer from './modules/Renderer';
import {Context, Action} from './@types/global';
import Painter from '@/modules/Painter';
import Rasterizer from './modules/Rasterizer';
import Tool from './modules/Tool';
import {ActionType} from './constants';

type IntializeOptions = {
  canvas?: HTMLCanvasElement,
  resolution?: {
    width?: number,
    height?: number,
  }
  painter?: Painter
}

/**
 * Entry Module
 */
export default class Boardy {
  private context: Context;
  private painter: Painter;
  private renderer: Renderer;
  private trigger: Trigger;

  constructor(options: IntializeOptions) {
    if (!options.canvas) {
      throw new Error('canvas element is required!');
    }

    // global context of all modules.
    this.context = this.initalizeContext(options);

    // manage drawing tools
    this.painter = options.painter || new Painter(this.context);

    // dispatcher role in flux architecture.
    this.renderer = new Renderer(
      this.painter,
      new Rasterizer(this.context),
    );

    // trigger events (ex. mouse event)
    this.trigger = new Trigger(this.context);
  }

  public on(handler: (action: Action) => void) {
    this.trigger.on(handler);
  }

  public render(action: Action) {
    this.renderer.render(action);
  }

  public addTool(toolName: string, tool: Tool) {
    this.painter.addTool(toolName, tool);
  }

  public useTool(toolName: string) {
    this.trigger.setTool(toolName);
  }

  /**
   * options => context
   *   + offscreen canvas
   *   + unit
   */
  private initalizeContext(options?: IntializeOptions): Context {
    const screenElement: HTMLCanvasElement = options.canvas;
    const offscreenElement: HTMLCanvasElement = document.createElement('canvas');
    const size: [number, number] = [
      screenElement.offsetWidth,
      screenElement.offsetHeight,
    ] || [500, 500];
    const resolution: [number, number] = this.initializeResolution(options, size);
    const unit: number = this.calculateUnit(size, resolution);

    offscreenElement.width = resolution[0];
    offscreenElement.height = resolution[1];

    return {
      canvas: {
        screen: screenElement,
        offscreen: offscreenElement,
      },
      ctx: {
        screen: screenElement.getContext('2d'),
        offscreen: offscreenElement.getContext('2d'),
      },
      size,
      resolution,
      unit,
    };
  }

  private initializeResolution(
    options: IntializeOptions,
    size: [number, number],
  ): [number, number] {
    const resolution: [number, number] = [0, 0];

    if (options.resolution) {
      resolution[0] = options.resolution.width ||
        (options.resolution.height / size[1]) * size[0];
      resolution[1] = options.resolution.height ||
        (options.resolution.width / size[0]) * size[1];
    } else {
      resolution[0] = 2048;
      resolution[1] = (resolution[0] / size[0] * size[1]);
    }

    return resolution;
  }

  private calculateUnit(size: [number, number], resolution: [number, number]): number {
    const unit: number = size[0] > size[1] ?
      resolution[1] / size[1] :
      resolution[0] / size[0];

    return unit;
  }

  static Tool = Tool;
  static ActionType = ActionType;
}

export {ActionType} from './constants';
