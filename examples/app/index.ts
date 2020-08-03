/* eslint-disable spaced-comment */
import Boardy, {ActionType} from '@/Boardy';

/////////////////////////////////////
/////////// Server //////////////////
/////////////////////////////////////

// virtual socket module for example
//   - to show like real-time communication
const socket = createVirtualSocket();

/////////////////////////////////////
/////////// Leader Client ///////////
/////////////////////////////////////

// 1. initialize boardy module
const leader = new Boardy({
  canvas: document.querySelector('#canvas-leader'),
});

// 2. set drawing tool
//    - blackline is default tool
leader.useTool('blackline');

// 3. if action is triggered,
//    3.1. render on self canvas.
//    3.2. send action using socket.
leader.on((action) => {
  leader.render(action);
  socket.send(action);
});


////////////////////////////////////
/////////// Member Clients /////////
////////////////////////////////////

const firstMember = new Boardy({
  canvas: document.querySelector('#canvas-member-1'),
});
const secondMember = new Boardy({
  canvas: document.querySelector('#canvas-member-2'),
});

socket.on((action) => {
  firstMember.render(action);
  secondMember.render(action);
});


////////////////////////////////////
///////// Custom Tool //////////////
////////////////////////////////////

// create line tool (to use global color)
//   - see example[add-tools] for details.
let penColor = '#000';
let crayonColor = '#000';
const globalColorLine = Boardy.Tool.create({
  [ActionType.MouseDown]: (ctx, pointX, pointY, unit) => {
    ctx.beginPath();
    ctx.moveTo(pointX, pointY);
    ctx.lineJoin = 'round';
    // if you want to set it to 1px,
    // use 1 * unit (multiply unit).
    // it will be drawn in 1px that can correspond to various resolutions
    ctx.lineWidth = 2 * unit;
    ctx.strokeStyle = penColor;
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
const globalColorCrayon = Boardy.Tool.extend(globalColorLine, {
  [ActionType.MouseDown]: (ctx, _, __, unit) => {
    ctx.strokeStyle = ctx.boardy.createCrayonPattern(crayonColor);
    ctx.lineCap = 'round';
    ctx.lineWidth = unit * 10;
  },
});
const lineToolName = 'globalColorLine';
const crayonToolName = 'globalColorCrayon';

(function initTool() {
  leader.addTool(lineToolName, globalColorLine);
  leader.addTool(crayonToolName, globalColorCrayon);
  firstMember.addTool(lineToolName, globalColorLine);
  firstMember.addTool(crayonToolName, globalColorCrayon);
  secondMember.addTool(lineToolName, globalColorLine);
  secondMember.addTool(crayonToolName, globalColorCrayon);
  allClientsUseTool(lineToolName);
})();

////////////////////////////////////
/////////// View ///////////////////
////////////////////////////////////

const toolSelectElements = [
  document.querySelector('#inp-pen'),
  document.querySelector('#inp-crayon'),
  document.querySelector('#btn-eraser'),
];

highlightTool(0);

toolSelectElements[0].addEventListener('input', (e: any) => {
  penColor = e.target.value;
  allClientsUseTool(lineToolName);
  highlightTool(0);
});

toolSelectElements[1].addEventListener('input', (e: any) => {
  crayonColor = e.target.value;
  allClientsUseTool(crayonToolName);
  highlightTool(1);
});

toolSelectElements[2].addEventListener('click', (e: any) => {
  allClientsUseTool('eraser');
  highlightTool(1);
});

function highlightTool(index) {
  toolSelectElements.forEach((el, i) => {
    if (i === index) el.parentElement.classList.add('is-selected');
    else el.parentElement.classList.remove('is-selected');
  });
}

////////////////////////////////////
/////////// Util ///////////////////
////////////////////////////////////

function allClientsUseTool(toolName) {
  leader.useTool(toolName);
  firstMember.useTool(toolName);
  secondMember.useTool(toolName);
}

function createVirtualSocket() {
  let communication;

  return {
    send(action) {
      communication(action);
    },
    on(fn) {
      communication = fn;
    },
  };
}
