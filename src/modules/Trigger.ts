import Shape from './Shape';
import {Viewport} from '@/@types/global';
import {Action} from '@/@types/global.d';
import EventChannel from '@/utils/EventChannel';
import IdGenerator from '@/utils/IdGenerator';
import {ActionType} from '@/constants/action';

export default class Trigger extends EventChannel<Action> {
  private viewport: Viewport;
  private triggerElement: Element;
  private id: IdGenerator;
  private drawedPathId: number;
  private shape: Shape;
  private usedShapeKey: number;

  constructor(viewport: Viewport, shape: Shape) {
    super();
    this.viewport = viewport;
    this.triggerElement = this.createTriggerElement();
    this.triggerElement.addEventListener('mousedown', this.handleMouseDown);
    this.triggerElement.addEventListener('mouseup', this.handleMouseUp);
    this.triggerElement.addEventListener('mouseout', this.handleMouseUp);
    this.triggerElement.addEventListener('mousemove', this.handleMouseMove);
    this.id = new IdGenerator();
    this.drawedPathId = null;
    this.shape = shape;
    this.usedShapeKey = IdGenerator.hashStringToNumber('default');
  }

  public useShape(shapeKey: string) {
    this.usedShapeKey = IdGenerator.hashStringToNumber(shapeKey);
  }

  private createTriggerElement(): Element {
    const triggerElement: HTMLElement = document.createElement('div');
    const containerElement: HTMLElement = this.viewport.containerElement as HTMLElement;
    const containerStyle = window.getComputedStyle(containerElement);

    if (!['relative', 'absolute', 'fixed'].includes(containerStyle.position)) {
      containerElement.style.position = 'relative';
    }

    triggerElement.style.position = 'absolute';
    triggerElement.style.top = '0';
    triggerElement.style.left = '0';
    triggerElement.style.right = '0';
    triggerElement.style.bottom = '0';
    containerElement.appendChild(triggerElement);

    return containerElement.lastElementChild;
  }

  private createAction(
    pathId: number,
    actionType: ActionType,
    pointX: number,
    pointY: number,
  ) {
    const action: Uint32Array = Uint32Array ? new Uint32Array(5) : [] as any;

    action[0] = pathId;
    action[1] = actionType;
    action[2] = pointX * this.viewport.unit;
    action[3] = pointY * this.viewport.unit;
    action[4] = this.usedShapeKey || 0;

    return action;
  }

  private readonly handleMouseDown = (e: MouseEvent): void => {
    const newPathId: number = this.id.get();
    const action: Action = this.createAction(
      newPathId,
      ActionType.Start,
      e.offsetX,
      e.offsetY,
    );

    this.drawedPathId = newPathId;
    this.emit(action);
  }

  private readonly handleMouseMove = (e: MouseEvent): void => {
    if (!this.drawedPathId) return;

    const action: Action = this.createAction(
      this.drawedPathId,
      ActionType.Move,
      e.offsetX,
      e.offsetY,
    );

    this.emit(action);
  }

  private readonly handleMouseUp = (e: MouseEvent): void => {
    const action: Action = this.createAction(
      this.drawedPathId,
      ActionType.End,
      e.offsetX,
      e.offsetY,
    );

    this.drawedPathId = null;
    this.emit(action);
  }
}
