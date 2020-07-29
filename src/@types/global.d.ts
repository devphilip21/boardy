export type Viewport = {
  id: string,
  containerElement: Element,
  svgElement: Element,
  size: [number, number],
  resolution: [number, number],
  unit: number
}

export type IntializeOptions = {
  id?: string,
  containerElement: Element,
  size?: [number, number],
  // resolution height is auto calculated using size.
  resolutionWidth?: number,
}

// [PathId, ActionType, PointX, PointY, ShapeKey]
export type Action = Uint32Array;

export type ShapeStyle = {
  [styleKey: string]: any
}

export type ShapeMap = {
  [hash: number]: ShapeStyle
}
