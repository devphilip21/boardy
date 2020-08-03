import Tool from '@/modules/Tool';
import {ActionType} from '@/constants';
import blackline from './blackline';

export default Tool.extend(blackline, {
  [ActionType.MouseDown]: (
    ctx,
    _,
    __,
    unit,
  ) => {
    ctx.strokeStyle = ctx.boardy.createCrayonPattern('#000');
    ctx.lineCap = 'round';
    ctx.lineWidth = unit * 10;
  },
});
