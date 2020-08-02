import Tool from '@/modules/Tool';
import {ActionType} from '@/constants';

export default Tool.create({
  [ActionType.MouseDown]: (
    ctx,
    pointX,
    pointY,
    unit,
  ) => {
    ctx.beginPath();
    ctx.moveTo(pointX, pointY);
    ctx.lineJoin = 'round';
    ctx.lineWidth = 1 * unit;
    ctx.strokeStyle = '#000';
  },
  [ActionType.MouseDownAndMove]: (
    ctx,
    pointX,
    pointY,
  ) => {
    ctx.lineTo(pointX, pointY);
    ctx.stroke();
  },
  [ActionType.MouseUp]: (ctx) => {
    ctx.closePath();
  },
  [ActionType.MouseOut]: (ctx) => {
    ctx.closePath();
  },
});
