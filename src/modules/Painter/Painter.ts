import {Context, Action} from '@/@types/global';
import {ActionType} from '@/constants';
import {IdGenerator} from '@/utils';

type Drawing = (
  ctx: CanvasRenderingContext2D,
  pointX: number,
  pointY: number,
  unit: number,
) => void;

type DrawingMap = {
  [drawingId: number]: {
    [actionType: number]: Drawing
  }
};

export default class Painter {
  private drawingMap: DrawingMap;
  private context: Context;

  constructor(context: Context) {
    this.context = context;
    this.drawingMap = {
      [IdGenerator.hashStringToNumber('default')]: {
        [ActionType.MouseDown]: this.defaultStartDrawing,
        [ActionType.MouseDownAndMove]: this.defaultMoveDrawing,
        [ActionType.MouseUp]: this.defaultEndDrawing,
        [ActionType.MouseOut]: this.defaultEndDrawing,
      },
    };
  }

  public paint(action: Action) {
    const actionType: number = action[0];
    const pointX: number = action[1];
    const pointY: number = action[2];
    const drawingId: number = action[3];
    const drawing: Drawing = this.drawingMap[drawingId] && this.drawingMap[drawingId][actionType];

    if (drawing) {
      drawing(
        this.context.ctx.offscreen,
        pointX,
        pointY,
        this.context.unit,
      );
    }
  }

  private readonly defaultStartDrawing: Drawing = (
    ctx,
    pointX,
    pointY,
    unit,
  ) => {
    ctx.beginPath();
    ctx.moveTo(pointX, pointY);
    ctx.lineJoin = 'round';
    ctx.lineWidth = unit * 1;
    ctx.strokeStyle = '#000';
  }

  private readonly defaultMoveDrawing: Drawing = (
    ctx,
    pointX,
    pointY,
  ) => {
    ctx.lineTo(pointX, pointY);
    ctx.stroke();
  }

  private readonly defaultEndDrawing: Drawing = (ctx) => {
    ctx.closePath();
  }
}
