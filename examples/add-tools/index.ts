import Boardy, {ActionType} from '@/Boardy';

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
//         pointX: CoordinateX,
//         pointY: CoordinateY,
//         unit: OnePixelByResolution
//       ) => void
const redLine = Boardy.Tool.create({
  // if mouse down, beginPath and set path style.
  [ActionType.MouseDown]: (ctx, pointX, pointY, unit) => {
    ctx.beginPath();
    ctx.moveTo(pointX, pointY);
    ctx.lineJoin = 'round';
    // if you want to set it to 1px,
    // use 1 * unit (multiply unit).
    // it will be drawn in 1px that can correspond to various resolutions
    ctx.lineWidth = 1 * unit;
    ctx.strokeStyle = '#f00';
  },
  // if mouse down and move, call lineTo and stroke.
  [ActionType.MouseDownAndMove]: (ctx, pointX, pointY) => {
    ctx.lineTo(pointX, pointY);
    ctx.stroke();
  },
  // if mouse up or out, close path.
  [ActionType.MouseUp]: (ctx) => {
    ctx.closePath();
  },
  [ActionType.MouseOut]: (ctx) => {
    ctx.closePath();
  },
});


// 2. add tool with name.
//   - you can use this tool by name
boardy.addTool('redLine', redLine);

// 3. use tool by name
boardy.useTool('redLine');
