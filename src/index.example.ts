import Boardy from './index';

const containerElement = document.getElementById('container');
const size = [500, 500] as [number, number];

// 1. initialize boardy module
const boardy = new Boardy({containerElement, size});

// 2. register shape map (key, value)
boardy.shape.add('black_line', {
  stroke: '#000',
  strokeWidth: 1,
});
boardy.shape.add('red_line', {
  stroke: '#F00',
  strokeWidth: 1,
});

// 3. you can set style of drawed path, using shape key
//   - shape key: you probably have registered! (step.2)
boardy.trigger.useShape('black_line');

// 4. if action is triggered,
//    you should be able to render it
//    by connecting it to renderer module (same in real-time model!)
boardy.trigger.on((action) => {
  boardy.renderer.render(action);
});

// 5. dynamic style change
setTimeout(() => {
  boardy.trigger.useShape('red_line');
}, 3000);
