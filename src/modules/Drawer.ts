import DomController from './DomController';
import {Viewport} from '@/@types/global';
import {STATE_LINE} from '@/constants/state';
import * as T from '@/constants/action';

/**
 * draw path on svg element
 * - cache all doms in SVG Element, for improving render performance.
 */
export default class Drawer {
  private viewport: Viewport;
  private dom: DomController;
  private state: { [pathId: string]: string }; // cache path-d

  constructor(viewport: Viewport) {
    this.viewport = viewport;
    this.dom = new DomController(viewport);
    this.state = {};
  }

  public draw(action: T.Action): void {
    switch (action[1] as T.ActionType) {
    case T.ActionType.LineStart: {
      this.lineStart(action);
      break;
    }
    case T.ActionType.LineMove: {
      this.lineMove(action);
      break;
    }
    case T.ActionType.LineEnd: {
      this.lineEnd(action);
      break;
    }
    }
  }

  private appendPath(pathId: string, pathElement: Element, dValue: string) {
    const prevPath: string = this.dom.getPathD(pathId);
    const nextPath: string = prevPath ? `${prevPath} ${dValue}` : dValue;

    pathElement.setAttributeNS(null, 'd', nextPath);
    this.dom.setPathD(pathId, nextPath);
  }

  private lineStart(action: T.Action): void {
    const pathId: string = `${action[0]}`;
    const pathElement: HTMLElement = this.dom.getPathElement(
      pathId,
    ) as HTMLElement;

    pathElement.style.stroke = '#000';
    pathElement.style.strokeWidth = `${this.viewport.unit}`;
    this.appendPath(pathId, pathElement, `M${action[2]},${action[3]}`);
  }

  private lineMove(action: T.Action): void {
    const pathId: string = `${action[0]}`;
    const pathElement: Element = this.dom.getPathElement(pathId);
    const dValue: string = this.state[pathId] === STATE_LINE ?
      `${action[2]},${action[3]}` :
      `L${action[2]},${action[3]}`;
    this.state[pathId] = STATE_LINE;

    this.appendPath(pathId, pathElement, dValue);
  }

  private lineEnd(action: T.Action): void {
    const pathId: string = `${action[0]}`;
    const pathElement: Element = this.dom.getPathElement(pathId);

    delete this.state[pathId];
    this.appendPath(pathId, pathElement, 'Z');
  }
}
