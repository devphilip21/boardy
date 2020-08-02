import Boardy, {ActionType} from '@/Boardy';

const boardy = new Boardy({
  canvas: document.querySelector('canvas'),
});

boardy.on((action) => {
  boardy.render(action);
});

// 1. maybe parent tool exist.
//   - see example[add-tools] for details.
const redLine = Boardy.Tool.create({
  [ActionType.MouseDown]: (ctx, pointX, pointY, unit) => {
    ctx.beginPath();
    ctx.moveTo(pointX, pointY);
    ctx.lineJoin = 'round';
    ctx.lineWidth = 1 * unit;
    ctx.strokeStyle = '#f00';
  },
  [ActionType.MouseDownAndMove]: (ctx, pointX, pointY) => {
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
const thickRedLine = Boardy.Tool.extend(redLine, {
  // if mouse down, beginPath and set path style.
  [ActionType.MouseDown]: (ctx, pointX, pointY, unit) => {
    ctx.lineWidth = 10 * unit;
  },
});


// 2. add tool with name.
//   - you can use this tool by name
boardy.addTool('thickRedLine', thickRedLine);

// 3. use tool by name
boardy.useTool('thickRedLine');
