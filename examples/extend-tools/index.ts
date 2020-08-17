import Boardy, {ActionType} from '@/Boardy';
import {Drawing} from '@/modules/Tool';

const boardy = new Boardy({
  canvas: document.querySelector('canvas'),
});

boardy.on((action) => {
  boardy.render(action);
});

// 1. maybe parent tool exist.
//   - see example[add-tools] for details.
const startRedLine: Drawing = (ctx, {pointX, pointY, unit}) => {
  ctx.beginPath();
  ctx.moveTo(pointX, pointY);
  ctx.lineJoin = 'round';
  ctx.lineWidth = 2 * unit;
  ctx.strokeStyle = '#f00';
};
const drawRedLine: Drawing = (ctx, {pointX, pointY}) => {
  ctx.lineTo(pointX, pointY);
  ctx.stroke();
};
const endRedLine: Drawing = (ctx) => {
  ctx.closePath();
};

const redLine = Boardy.Tool.create({
  [ActionType.MouseDown]: startRedLine,
  [ActionType.DragIn]: startRedLine,
  [ActionType.Drag]: drawRedLine,
  [ActionType.MouseUp]: endRedLine,
  [ActionType.DragOut]: endRedLine,
});


// 2. extends your custom tools!
//   - args[0]: parent tool
//   - args[1]: { [actionType]: DrawingFunction }
//     - actionType: declared in Boardy.ActionType
//     - DrawingFunction: (
//         ctx: CanvasContext,
//         pointX: CoordinateX,
//         pointY: CoordinateY,
//         unit: OnePixelByResolution
//       ) => void
const startThickRedLine = (ctx, {unit}) => {
  ctx.lineWidth = 10 * unit;
};
const thickRedLine = Boardy.Tool.extend(redLine, {
  // if mouse down, beginPath and set path style.
  [ActionType.MouseDown]: startThickRedLine,
  [ActionType.DragIn]: startThickRedLine,
});


// 2. add tool with name.
//   - you can use this tool by name
boardy.addTool('thickRedLine', thickRedLine);

// 3. use tool by name
boardy.useTool('thickRedLine');
