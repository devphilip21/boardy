import {Context, Action} from '@/@types/global';
import {EventChannel, IdGenerator} from '@/utils';
import {ActionType} from '@/constants';

type EventHandler = (e: Event) => void;

export default class Trigger extends EventChannel<Action> {
  private context: Context;
  private currentToolId: number;
  private isMouseDown: boolean;
  private toolId: { [toolName: string]: number };

  constructor(context: Context) {
    super();

    this.toolId = {
      behavior: IdGenerator.hashStringToNumber('behavior'),
    };
    this.context = context;
    this.currentToolId = this.toolId.behavior;
    this.addCanvasEventListeners();
    this.isMouseDown = false;
  }

  public setTool(toolName: string) {
    if (!this.toolId[toolName]) {
      this.toolId[toolName] = IdGenerator.hashStringToNumber(toolName);
    }

    this.currentToolId = this.toolId[toolName];
  }

  public destroy() {
    this.removeCanvasEventListeners();
  }

  private addCanvasEventListeners() {
    const canvas: HTMLCanvasElement = this.context.canvas.screen;

    canvas.addEventListener('mousedown', this.handleMouseDown);
    canvas.addEventListener('mouseup', this.handleMouseUp);
    canvas.addEventListener('mouseout', this.handleMouseOut);
    canvas.addEventListener('mousemove', this.handleMouseMove);
  }

  private removeCanvasEventListeners() {
    const canvas: HTMLCanvasElement = this.context.canvas.screen;

    canvas.removeEventListener('mousedown', this.handleMouseDown);
    canvas.removeEventListener('mouseup', this.handleMouseUp);
    canvas.removeEventListener('mouseout', this.handleMouseOut);
    canvas.removeEventListener('mousemove', this.handleMouseMove);
  }

  private createMouseAction(e: MouseEvent, actionType: ActionType): Action {
    const action: Action = Uint32Array ? new Uint32Array(5) : ([] as any);

    action[0] = actionType;
    action[1] = e.offsetX * this.context.unit;
    action[2] = e.offsetY * this.context.unit;
    action[3] = this.context.unit;
    action[4] = this.currentToolId;

    return action;
  }

  private readonly handleCommon = (handler: EventHandler): EventHandler => {
    return (e) => {
      if (this.currentToolId === this.toolId.behavior) {
        return;
      }
      handler(e);
    };
  }

  private readonly handleMouseDown = this.handleCommon((e: MouseEvent) => {
    const action: Action = this.createMouseAction(e, ActionType.MouseDown);

    this.emit(action);
    this.isMouseDown = true;
  })

  private readonly handleMouseUp = this.handleCommon((e: MouseEvent) => {
    const action: Action = this.createMouseAction(e, ActionType.MouseUp);

    this.emit(action);
    this.isMouseDown = false;
  })

  private readonly handleMouseOut = this.handleCommon((e: MouseEvent) => {
    const action: Action = this.createMouseAction(e, ActionType.MouseOut);

    this.emit(action);
    this.isMouseDown = false;
  })

  private readonly handleMouseMove = this.handleCommon((e: MouseEvent) => {
    const actionType: ActionType = this.isMouseDown ?
      ActionType.MouseDownAndMove :
      ActionType.MouseMove;
    const action: Action = this.createMouseAction(e, actionType);

    this.emit(action);
  })
}
