import Tool from '@/modules/Tool';
import {ActionType} from '@/constants';

export default Tool.create({
  [ActionType.MouseDown]: (ctx) => {
    ctx.globalCompositeOperation = 'destination-out';
  },
  [ActionType.Drag]: (ctx, {pointX, pointY, unit}) => {
    ctx.beginPath();
    ctx.arc(pointX, pointY, unit * 20, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();
  },
  [ActionType.MouseOut]: (ctx) => {
    ctx.globalCompositeOperation = 'source-over';
  },
  [ActionType.MouseUp]: (ctx) => {
    ctx.globalCompositeOperation = 'source-over';
  },
});
