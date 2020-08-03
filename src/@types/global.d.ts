export type Context = {
  canvas: {
    screen: HTMLCanvasElement,
    offscreen: HTMLCanvasElement,
  },
  ctx: {
    screen: CanvasRenderingContext2D,
    offscreen: CanvasRenderingContext2D,
  },
  size: [number, number], // width, height
  resolution: [number, number], // width, height
  unit: [number, number, number] // width, height, contents
}

/**
 * @description
 * [ActionType, PointX, PointY, Unit, toolId]
 */
export type Action = Uint32Array;
