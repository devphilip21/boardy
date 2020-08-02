import {ActionType} from '@/constants';

export type Drawing = (
  ctx: CanvasRenderingContext2D,
  pointX: number,
  pointY: number,
  unit: number,
) => void;

export type DrawingMap = {
  [actionType: number]: Drawing
};

export default class Tool {
  private drawingMap: DrawingMap;

  constructor(drawingMap: DrawingMap) {
    this.drawingMap = drawingMap || {};
  }

  public set(actionType: ActionType, drawing: Drawing) {
    this.drawingMap[actionType] = drawing;
  }

  public get(actionType: ActionType) {
    return this.drawingMap[actionType];
  }

  static create(drawingMap: DrawingMap): Tool {
    return new Tool(drawingMap);
  }
}
