import Trigger from '@/modules/Trigger';
import Renderer from '@/modules/Renderer';
import Painter from '@/modules/Painter';
import Rasterizer from '@/modules/Rasterizer';
import Tool from '@/modules/Tool';
import {Context, Action, ContextSize, ContextResolution, ContextUnit} from '@/@types/base';
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
    const size: ContextSize = this.intializeSize(options);
    const resolution: ContextResolution = this.initializeResolution(options, size);
    const unit: ContextUnit = this.calculateUnit(size, resolution);

    screenElement.width = size.width;
    screenElement.height = size.height;
    offscreenElement.width = resolution.width;
    offscreenElement.height = resolution.height;

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

  private intializeSize(options: IntializeOptions): ContextSize {
    const size: ContextSize = options.canvas?.offsetWidth ? {
      width: options.canvas.offsetWidth,
      height: options.canvas.offsetHeight,
    } : {
      width: 500,
      height: 500,
    };

    return size;
  }

  private initializeResolution(
    options: IntializeOptions,
    size: ContextSize,
  ): ContextResolution {
    const resolution: ContextResolution = {
      width: 0,
      height: 0,
    };

    if (options.resolution) {
      resolution.width = options.resolution.width ||
        (options.resolution.height / size.height) * size.width;
      resolution.height = options.resolution.height ||
        (options.resolution.width / size.width) * size.height;
    } else {
      resolution.width = 2048;
      resolution.height = (resolution.width / size.width * size.height);
    }

    return resolution;
  }

  private calculateUnit(
    size: ContextSize,
    resolution: ContextResolution,
  ): ContextUnit {
    const unit: ContextUnit = {
      width: 0,
      height: 0,
      contents: 0,
    };

    unit.width = resolution.width / size.width;
    unit.height = resolution.height / size.height;
    unit.contents = size.width > size.height ? unit.height : unit.width;

    return unit;
  }

  private readonly handleResize = ({width, height}) => {
    const nextUnit = this.calculateUnit({width, height}, this.context.resolution);

    this.context.size.width = width;
    this.context.size.height = height;
    this.context.canvas.screen.width = width;
    this.context.canvas.screen.height = height;
    this.context.unit.width = nextUnit.width;
    this.context.unit.height = nextUnit.height;
    this.renderer.render(null);
  }

  static Tool = Tool;
  static ActionType = ActionType;
}

export {ActionType} from './constants';
