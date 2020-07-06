/* eslint-disable no-unused-vars */
declare namespace T {
  export enum ShapeType {
    Fragment,
    Line,
    Point,
  }
  export enum ActionType {
    DrawLine
  }
  export type Shape = Fragment | Line | Point;
  export type Fragment = {
    t: ShapeType;
    c: Shape[];
  }
  export type Line = {
    t: ShapeType;
    c: Point[];
  }
  export type Point = {
    t: ShapeType;
    c: number[];
  }
  export type Action = {
    t: ActionType,
    s: Shape
  }
}
