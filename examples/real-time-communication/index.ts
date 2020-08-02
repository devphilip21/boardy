/* eslint-disable spaced-comment */
import Boardy from '@/Boardy';

/////////////////////////////////////
/////////// Server //////////////////
/////////////////////////////////////

// virtual socket module
//   to show like real-time communication
const socket = createVirtualSocket();


/////////////////////////////////////
/////////// Leader Client ///////////
/////////////////////////////////////

// 1. initialize boardy module
const leader = new Boardy({
  canvas: document.querySelector('#leader-canvas'),
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
  canvas: document.querySelector('#member-canvas-1'),
});
const secondMember = new Boardy({
  canvas: document.querySelector('#member-canvas-2'),
});

socket.on((action) => {
  firstMember.render(action);
  secondMember.render(action);
});


////////////////////////////////////
/////////// Util ///////////////////
////////////////////////////////////

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
