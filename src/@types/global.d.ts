export type Context = {
  canvas: {
    screen: HTMLCanvasElement,
    offscreen: HTMLCanvasElement,
  },
  ctx: {
    screen: CanvasRenderingContext2D,
    offscreen: CanvasRenderingContext2D,
  },
  size: [number, number],
  resolution: [number, number],
  unit: number
}

/**
 * @description
 * [ActionType, PointX, PointY, DrawingId]
 */
export type Action = Uint32Array;
