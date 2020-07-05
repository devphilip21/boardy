/* eslint-disable no-unused-vars */
declare namespace T {
  export namespace Shape {
    export type Type = 'f' | 'l' | 'p';
    export type All = Fragment | Line | Point;
    export type Fragment = {
      t: 'f';
      c: All[];
    }
    export type Line = {
      t: 'l';
      c: Point[];
    }
    export type Point = {
      t: 'p';
      x: number;
      y: number;
    }
  }
}
