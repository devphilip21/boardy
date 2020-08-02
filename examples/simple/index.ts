import Boardy from '@/Boardy';

// 1. initialize boardy module
const boardy = new Boardy({
  canvas: document.querySelector('canvas'),
});

// 2. set drawing tool
//    - blackline is default tool
boardy.useTool('blackline');

// 3. if action is triggered,
//    you should be able to render it
//    by connecting it to renderer module (same in real-time model!)
boardy.on((action) => {
  boardy.render(action);
});
