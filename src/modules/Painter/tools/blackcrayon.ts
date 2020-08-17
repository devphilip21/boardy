import Tool, {Drawing} from '@/modules/Tool';
import {ActionType} from '@/constants';
import data from '@/constants/crayonTexture';
import blackline from './blackline';

/**
 * Crayon Texture Image
 * TODO: async resource handling architecture
 */
const image = (function(): HTMLImageElement {
  const imageSource: HTMLImageElement = document.createElement('img') as HTMLImageElement;
  imageSource.width = data.width;
  imageSource.height = data.height;
  imageSource.src = data.src;
  return imageSource;
})();
const cache: { [unit: number]: HTMLCanvasElement } = {};
const createCrayonTexture = (unit: number): HTMLCanvasElement => {
  if (cache[unit]) {
    return cache[unit];
  }

  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
  const canvasWidth: number = data.width * unit;
  const canvasHeight: number = data.height * unit;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.drawImage(
    image,
    0, 0, image.width, image.height,
    0, 0, canvasWidth, canvasHeight,
  );
  cache[unit] = canvas;

  return canvas;
};

/**
 * DrawingFunctions
 */
const setCrayonLineStyle: Drawing = (ctx, {unit}) => {
  const texture: HTMLCanvasElement = createCrayonTexture(unit);

  ctx.strokeStyle = ctx.createPattern(texture, 'repeat');
  ctx.lineCap = 'round';
  ctx.lineWidth = unit * 10;
};

export default Tool.extend(blackline, {
  [ActionType.MouseDown]: setCrayonLineStyle,
  [ActionType.DragIn]: setCrayonLineStyle,
});
