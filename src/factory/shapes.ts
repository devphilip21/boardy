export const createFragment = (
  children?: T.Shape[],
): T.Fragment => {
  return {
    t: T.ShapeType.Fragment,
    c: children || [],
  };
};

export const createLine = (
  points: T.Point[],
): T.Line => {
  return {
    t: T.ShapeType.Line,
    c: points,
  };
};

export const createPoint = (
  x: number,
  y: number,
): T.Point => {
  return {
    t: T.ShapeType.Point,
    c: [x, y],
  };
};
