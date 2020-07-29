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
