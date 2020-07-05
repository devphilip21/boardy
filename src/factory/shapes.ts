export const createFragment = (children?: T.Shape.All[]): T.Shape.Fragment => {
  return {
    t: 'f',
    c: children || [],
  };
};

export const createLine = (points: T.Shape.Point[]): T.Shape.Line => {
  return {t: 'l', c: points};
};

export const createPoint = (x: number, y: number): T.Shape.Point => {
  return {t: 'p', x, y};
};
