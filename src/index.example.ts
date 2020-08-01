import Boardy from './index';

// 1. initialize boardy module
const boardy = new Boardy({
  canvas: document.querySelector('canvas'),
});

// 2. if action is triggered,
//    you should be able to render it
//    by connecting it to renderer module (same in real-time model!)
boardy.on((action) => {
  boardy.render(action);
});
