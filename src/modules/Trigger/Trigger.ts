import {Context, Action} from '@/@types/global';
import {EventChannel, IdGenerator} from '@/utils';
import {ActionType} from '@/constants';

export default class Trigger extends EventChannel<Action> {
  private context: Context;
  private currentDrawingId: number;
  private isMouseDown: boolean;

  constructor(context: Context) {
    super();

    this.context = context;
    this.currentDrawingId = IdGenerator.hashStringToNumber('default');
    this.addCanvasEventListeners();
    this.isMouseDown = false;
  }

  public setDrawingType(drawingType: string) {
    this.currentDrawingId = IdGenerator.hashStringToNumber(drawingType);
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
    const action: Action = Uint32Array ? new Uint32Array(4) : ([] as any);

    action[0] = actionType;
    action[1] = e.offsetX;
    action[2] = e.offsetY;
    action[3] = this.currentDrawingId;

    return action;
  }

  private readonly handleMouseDown = (e: MouseEvent) => {
    const action: Action = this.createMouseAction(e, ActionType.MouseDown);

    this.emit(action);
    this.isMouseDown = true;
  }

  private readonly handleMouseUp = (e: MouseEvent) => {
    const action: Action = this.createMouseAction(e, ActionType.MouseUp);

    this.emit(action);
    this.isMouseDown = false;
  }

  private readonly handleMouseOut = (e: MouseEvent) => {
    const action: Action = this.createMouseAction(e, ActionType.MouseOut);

    this.emit(action);
    this.isMouseDown = false;
  }

  private readonly handleMouseMove = (e: MouseEvent) => {
    const actionType: ActionType = this.isMouseDown ?
      ActionType.MouseDownAndMove :
      ActionType.MouseMove;
    const action: Action = this.createMouseAction(e, actionType);

    this.emit(action);
  }
}
