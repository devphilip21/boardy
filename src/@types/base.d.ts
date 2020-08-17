export type ContextCanvas = {
  screen: HTMLCanvasElement,
  offscreen: HTMLCanvasElement,
}

export type ContextCtx = {
  screen: CanvasRenderingContext2D,
  offscreen: CanvasRenderingContext2D,
}

export type ContextSize = {
  width: number,
  height: number,
}

export type ContextResolution = {
  width: number,
  height: number,
}

export type ContextUnit = {
  width: number,
  height: number,
  contents: number,
}

export type Context = {
  canvas: ContextCanvas,
  ctx: ContextCtx,
  size: ContextSize,
  resolution: ContextResolution,
  unit: ContextUnit,
}

/**
 * @description
 * [ActionType, PointX, PointY, Unit, toolId]
 */
export type Action = Uint32Array;
