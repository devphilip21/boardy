import Boardy from '@/Boardy';

const boardy = new Boardy({
  canvas: document.querySelector('canvas'),
});

boardy.useTool('blackline');
boardy.on((action) => {
  boardy.render(action);
});
