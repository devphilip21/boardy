import Tool, {Drawing} from '@/modules/Tool';
import {Context, Action} from '@/@types/global';
import {ActionType} from '@/constants';
import {IdGenerator} from '@/utils';
import * as tools from './tools';

export type Tools = {
  [toolId: number]: Tool,
}

export default class Painter {
  private tools: Tools;
  private context: Context;

  constructor(context: Context) {
    this.context = context;
    this.tools = {
      [IdGenerator.hashStringToNumber('blackline')]: tools.blackline,
    };
  }

  public paint(action: Action) {
    const actionType: number = action[0];
    const pointX: number = action[1];
    const pointY: number = action[2];
    const toolId: number = action[3];
    const drawing: Drawing = this.tools[toolId] && this.tools[toolId].get(actionType);

    if (drawing) {
      drawing(
        this.context.ctx.offscreen,
        pointX,
        pointY,
        this.context.unit,
      );
    }
  }

  public addTool(toolName: string, tool: Tool) {
    const toolId: number = IdGenerator.hashStringToNumber(toolName);

    this.tools[toolId] = tool;
  }
}
