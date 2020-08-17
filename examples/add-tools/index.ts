import Boardy, {ActionType} from '@/Boardy';
import {Drawing} from '@/modules/Tool';

const boardy = new Boardy({
  canvas: document.querySelector('canvas'),
});

boardy.on((action) => {
  boardy.render(action);
});

// 1. create your custom tools!
//   - args: { [actionType]: DrawingFunction }
//     - actionType: declared in Boardy.ActionType
//     - DrawingFunction: (
//         ctx: CanvasContext,
//         values: {
//           pointX: CoordinateX,
//           pointY: CoordinateY,
//           unit: OnePixelByResolution
//         }
//       ) => void
const startRedLine: Drawing = (ctx, {pointX, pointY, unit}) => {
  ctx.beginPath();
  ctx.moveTo(pointX, pointY);
  ctx.lineJoin = 'round';
  // if you want to set it to 1px,
  // use 1 * unit (multiply unit).
  // it will be drawn in 1px that can correspond to various resolutions
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
  // if mouse down or entering the canvas, beginPath and set path style.
  [ActionType.MouseDown]: startRedLine,
  [ActionType.DragIn]: startRedLine,
  // if dragging(mouse down and move), draw line
  [ActionType.Drag]: drawRedLine,
  // if mouse up or exit the canvas, close path.
  [ActionType.MouseUp]: endRedLine,
  [ActionType.DragOut]: endRedLine,
});


// 2. add tool with name.
//   - you can use this tool by name
boardy.addTool('redLine', redLine);

// 3. use tool by name
boardy.useTool('redLine');
