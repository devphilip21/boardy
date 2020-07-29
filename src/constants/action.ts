export enum ActionType {
  LineStart,
  LineMove,
  LineEnd,
}
// [PathId, ActionType, PointX, PointY]
export type Action = Uint32Array;
