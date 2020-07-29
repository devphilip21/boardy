import Boardy from './index';

const containerElement = document.getElementById('container');
const size = [500, 500] as [number, number];
const boardy = new Boardy({containerElement, size});

boardy.trigger.on((action) => {
  boardy.renderer.render(action);
});

