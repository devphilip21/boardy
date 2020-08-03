import Tool, {Drawing} from '@/modules/Tool';
import {Context, Action} from '@/@types/global';
import {IdGenerator} from '@/utils';
import * as tools from './tools';
import crayonTexture from '@/constants/crayonTexture';

export type Tools = {
  [toolId: number]: Tool,
}

export default class Painter {
  private tools: Tools;
  private context: Context;
  private crayonTextureImage: HTMLImageElement

  constructor(context: Context) {
    this.context = context;
    this.crayonTextureImage = this.createCrayonTextureImage();
    this.context.ctx.offscreen.globalCompositeOperation = 'source-over';
    this.context.ctx.offscreen.boardy.createCrayonPattern = this.createCrayonTexture;
    this.tools = {
      [IdGenerator.hashStringToNumber('blackline')]: tools.blackline,
      [IdGenerator.hashStringToNumber('blackcrayon')]: tools.blackcrayon,
      [IdGenerator.hashStringToNumber('eraser')]: tools.eraser,
    };
  }

  public paint(action: Action) {
    const actionType: number = action[0];
    const pointX: number = action[1];
    const pointY: number = action[2];
    const unit: number = action[3];
    const toolId: number = action[4];
    const drawing: Drawing = this.tools[toolId] && this.tools[toolId].get(actionType);

    if (drawing) {
      drawing(
        this.context.ctx.offscreen,
        pointX,
        pointY,
        unit,
      );
    }
  }

  public addTool(toolName: string, tool: Tool) {
    const toolId: number = IdGenerator.hashStringToNumber(toolName);

    this.tools[toolId] = tool;
  }

  private createCrayonTextureImage() {
    const imageSource: HTMLImageElement = document.createElement('img') as HTMLImageElement;

    imageSource.width = crayonTexture.width;
    imageSource.height = crayonTexture.height;
    imageSource.src = crayonTexture.src;

    return imageSource;
  }

  private readonly createCrayonTexture = (color: string): CanvasPattern => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    canvas.width = crayonTexture.width;
    canvas.height = crayonTexture.height;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, crayonTexture.width, crayonTexture.height);
    ctx.drawImage(this.crayonTextureImage, 0, 0);

    return this.context.ctx.offscreen.createPattern(canvas, 'repeat');
  }
}
