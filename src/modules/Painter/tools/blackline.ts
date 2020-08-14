import Tool, {Drawing} from '@/modules/Tool';
import {ActionType} from '@/constants';

/**
 * Drawing Functions
 */
const startLine: Drawing = (ctx, {pointX, pointY, unit}) => {
  ctx.beginPath();
  ctx.moveTo(pointX, pointY);
  ctx.lineJoin = 'round';
  ctx.lineWidth = 1 * unit;
  ctx.strokeStyle = '#000';
};
const drawLine: Drawing = (ctx, {pointX, pointY}) => {
  ctx.lineTo(pointX, pointY);
  ctx.stroke();
};
const endLine: Drawing = (ctx, values) => {
  drawLine(ctx, values);
  ctx.closePath();
};

/**
 * Tool Object { [Event]: DrawingFunction }
 */
export default Tool.create({
  [ActionType.MouseDown]: startLine,
  [ActionType.DragIn]: startLine,
  [ActionType.Drag]: drawLine,
  [ActionType.DragOut]: endLine,
  [ActionType.MouseUp]: endLine,
});
