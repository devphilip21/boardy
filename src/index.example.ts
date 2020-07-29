import Boardy from './index';
import * as T from '@/constants/action';

const containerElement = document.getElementById('container') as Element;
const size = [300, 300] as [number, number];
const resolutionPowers = [5, 5] as [number, number];
const boardy = new Boardy(
  'helloworld',
  containerElement,
  size,
  resolutionPowers,
);

[
  new Uint32Array([1, T.ActionType.LineStart, 0, 0]),
  new Uint32Array([1, T.ActionType.LineMove, 100000, 100000]),
  new Uint32Array([1, T.ActionType.LineEnd, 0, 0]),
].forEach((action) => {
  boardy.render(action);
});
