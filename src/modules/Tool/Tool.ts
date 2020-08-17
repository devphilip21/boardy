import {ActionType} from '@/constants';

export type Drawing = (
  ctx: CanvasRenderingContext2D,
  values: {
    pointX: number,
    pointY: number,
    unit: number,
  }
) => void;

export type DrawingMap = {
  [actionType: number]: Drawing
};

export default class Tool {
  private drawingMap: DrawingMap;

  constructor(drawingMap: DrawingMap) {
    this.drawingMap = drawingMap || {};
  }

  public set(actionType: ActionType, drawing: Drawing): void {
    this.drawingMap[actionType] = drawing;
  }

  public get(actionType: ActionType): Drawing {
    return this.drawingMap[actionType];
  }

  public getActionTypes(): number[] {
    const keys: string[] = Object.keys(this.drawingMap);
    const actionTypes: number[] = [];

    keys.forEach((key) => {
      const actionType: number = Number.parseInt(key, 10);

      if (!Number.isNaN(actionType)) {
        actionTypes.push(actionType);
      }
    });

    return actionTypes;
  }

  static create(drawingMap: DrawingMap): Tool {
    return new Tool(drawingMap);
  }

  static extend(parentTools: Tool, childDrawingMap: DrawingMap): Tool {
    const curried: DrawingMap = {...childDrawingMap};

    parentTools.getActionTypes().forEach((actionType: number) => {
      const drawingOfParent: Drawing = parentTools.get(actionType);
      const drawingOfChild: Drawing = curried[actionType];
      const curriedDrawing: Drawing = !drawingOfChild ?
        drawingOfParent :
        (...args) => {
          drawingOfParent(...args);
          drawingOfChild(...args);
        };

      curried[actionType] = curriedDrawing;
    });

    return new Tool(curried);
  }
}
