/* eslint-disable spaced-comment */
import Boardy, {ActionType} from '@/Boardy';
import blackline from '@/modules/Painter/tools/blackline';
import {Drawing} from '@/modules/Tool';

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
//   - see example[extend-tools] for details.
let penColor = '#000';

/**
 * line using global color
 */
const startLine: Drawing = (ctx, {unit}) => {
  ctx.strokeStyle = penColor;
  ctx.lineWidth = 3 * unit;
};
const globalColorLine = Boardy.Tool.extend(blackline, {
  [ActionType.MouseDown]: startLine,
  [ActionType.DragIn]: startLine,
});

/**
 * wave using global color
 */
const lineToolName = 'globalColorLine';

(function initTool() {
  leader.addTool(lineToolName, globalColorLine);
  firstMember.addTool(lineToolName, globalColorLine);
  secondMember.addTool(lineToolName, globalColorLine);
  allClientsUseTool(lineToolName);
})();

////////////////////////////////////
/////////// View ///////////////////
////////////////////////////////////

const toolSelectElements = [
  document.querySelector('#inp-pen'),
  document.querySelector('#btn-eraser'),
];

highlightTool(0);

toolSelectElements[0].addEventListener('input', (e: any) => {
  penColor = e.target.value;
  allClientsUseTool(lineToolName);
  highlightTool(0);
});

toolSelectElements[1].addEventListener('click', () => {
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
