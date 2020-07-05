/* eslint-disable no-unused-vars */
declare namespace T {
  export type ShapeType = 'fragment' | 'line' | 'point'
  export type ObserverPayload = {
    type: ShapeType;
    payload: any;
  };
  export type Observer = (payload: ObserverPayload) => void
  export type Unregister = () => void;
  export type RemoveChild = () => void;
}
