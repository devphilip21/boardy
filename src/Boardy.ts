import Trigger from '@/modules/Trigger';
import Renderer from '@/modules/Renderer';
import Painter from '@/modules/Painter';
import Rasterizer from '@/modules/Rasterizer';
import Tool from '@/modules/Tool';
import {Context, Action} from '@/@types/base';
import {ActionType} from '@/constants';
import {ResizeObserver} from '@/utils';

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
  private resizeObserver: ResizeObserver;

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

    // on resize
    this.resizeObserver = new ResizeObserver(this.context.canvas.screen, {
      debounceTime: 300,
    });
    this.resizeObserver.on(this.handleResize);
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
    const size: [number, number] = this.intializeSize(options);
    const resolution: [number, number] = this.initializeResolution(options, size);
    const unit: [number, number, number] = this.calculateUnit(size, resolution);

    screenElement.width = size[0];
    screenElement.height = size[1];
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

  private intializeSize(options: IntializeOptions): [number, number] {
    const size: [number, number] = [
      options.canvas.offsetWidth,
      options.canvas.offsetHeight,
    ] || [500, 500];

    return size;
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

  private calculateUnit(
    size: [number, number],
    resolution: [number, number],
  ): [number, number, number] {
    const unit: [number, number, number] = [0, 0, 0];

    unit[0] = resolution[0] / size[0];
    unit[1] = resolution[1] / size[1];
    unit[2] = size[0] > size[1] ? unit[1] : unit[0];

    return unit;
  }

  private readonly handleResize = ({width, height}) => {
    const nextUnit = this.calculateUnit(
      [width, height],
      [this.context.resolution[0], this.context.resolution[1]],
    );

    this.context.size[0] = width;
    this.context.size[1] = height;
    this.context.canvas.screen.width = width;
    this.context.canvas.screen.height = height;
    this.context.unit[0] = nextUnit[0];
    this.context.unit[1] = nextUnit[1];
    this.renderer.render(null);
  }

  static Tool = Tool;
  static ActionType = ActionType;
}

export {ActionType} from './constants';
