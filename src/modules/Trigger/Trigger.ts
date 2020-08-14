import {Context, Action} from '@/@types/base';
import {EventChannel, IdGenerator} from '@/utils';
import {ActionType} from '@/constants';

type EventHandler = (e: Event) => void;

// [TODO] addWindowEventListeners(), addCanvasEventListener()
//   If multiple Boardy objects are created in one app,
//   optimization is needed to recycle one window event.
//   + singleton
// [Question] Why did seperate the "window events" from the "canvas events"?
//   if canvas events is used only, we cannot offer UX connectivity - feeling.
//   if window events is used only, there are performance issue.
//      (browser-reflow, position calculation)
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
    this.addDocumentEventListeners();
    this.isMouseDown = false;
  }

  public setTool(toolName: string) {
    if (!this.toolId[toolName]) {
      this.toolId[toolName] = IdGenerator.hashStringToNumber(toolName);
    }

    this.currentToolId = this.toolId[toolName];
  }

  public destroy() {
    this.removeDocumentEventListeners();
  }

  private addDocumentEventListeners() {
    const canvas: HTMLCanvasElement = this.context.canvas.screen;

    // canvas events: trigger with poisition.
    canvas.addEventListener('mouseover', this.handleMouseIn);
    canvas.addEventListener('mouseout', this.handleMouseOut);
    canvas.addEventListener('mousemove', this.handleMouseMove);
    // window events: check only mouse down/up.
    window.addEventListener('mousedown', this.handleMouseDownOnWindow);
    window.addEventListener('mouseup', this.handleMouseUpOnWindow);
  }

  private removeDocumentEventListeners() {
    const canvas: HTMLCanvasElement = this.context.canvas.screen;

    // canvas events
    canvas.removeEventListener('mouseover', this.handleMouseIn);
    canvas.removeEventListener('mouseout', this.handleMouseOut);
    canvas.removeEventListener('mousemove', this.handleMouseMove);
    // window events
    window.removeEventListener('mousedown', this.handleMouseDownOnWindow);
    window.removeEventListener('mouseup', this.handleMouseUpOnWindow);
  }

  private createAction(
    pointX: number,
    pointY: number,
    actionType: ActionType,
  ): Action {
    const action: Action = Uint32Array ? new Uint32Array(5) : ([] as any);

    action[0] = actionType;
    action[1] = this.checkPointXOverflow(pointX) * this.context.unit.width;
    action[2] = this.checkPointYOverflow(pointY) * this.context.unit.height;
    action[3] = this.context.unit.contents;
    action[4] = this.currentToolId;

    return action;
  }

  private checkPointXOverflow(offsetX: number): number {
    if (offsetX < 0) {
      offsetX = 0;
    } else if (offsetX > this.context.size.width) {
      offsetX = this.context.size.width;
    }

    return offsetX;
  }

  private checkPointYOverflow(offsetY: number): number {
    if (offsetY < 0) {
      offsetY = 0;
    } else if (offsetY > this.context.size.height) {
      offsetY = this.context.size.height;
    }

    return offsetY;
  }

  private readonly handleCommon = (handler: EventHandler): EventHandler => {
    return (e) => {
      if (this.currentToolId === this.toolId.behavior) {
        return;
      }
      handler(e);
    };
  }

  private readonly handleMouseIn = this.handleCommon((e: MouseEvent) => {
    const actionType: ActionType = this.isMouseDown ?
      ActionType.DragIn :
      ActionType.MouseIn;
    const action: Action = this.createAction(e.offsetX, e.offsetY, actionType);

    this.emit(action);
  });

  private readonly handleMouseOut = this.handleCommon((e: MouseEvent) => {
    const actionType: ActionType = this.isMouseDown ?
      ActionType.DragOut :
      ActionType.MouseOut;
    const action: Action = this.createAction(e.offsetX, e.offsetY, actionType);

    this.emit(action);
  })

  private readonly handleMouseMove = this.handleCommon((e: MouseEvent) => {
    const actionType: ActionType = this.isMouseDown ?
      ActionType.Drag :
      ActionType.MouseMove;
    const action: Action = this.createAction(e.offsetX, e.offsetY, actionType);

    this.emit(action);
  })

  private readonly handleMouseDownOnWindow = this.handleCommon((e: MouseEvent) => {
    this.isMouseDown = true;

    if (e.target !== this.context.canvas.screen) return;
    const actionType: ActionType = ActionType.MouseDown;
    const action: Action = this.createAction(e.offsetX, e.offsetY, actionType);

    this.emit(action);
  })

  private readonly handleMouseUpOnWindow = this.handleCommon((e: MouseEvent) => {
    this.isMouseDown = false;

    if (e.target !== this.context.canvas.screen) return;
    const actionType: ActionType = ActionType.MouseUp;
    const action: Action = this.createAction(e.offsetX, e.offsetY, actionType);

    this.emit(action);
  })
}
