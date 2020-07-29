import DomController from './DomController';
import {Viewport, Action} from '@/@types/global';
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

  public draw(action: Action): void {
    switch (action[1] as T.ActionType) {
    case T.ActionType.Start: {
      this.pathStart(action);
      break;
    }
    case T.ActionType.Move: {
      this.pathMove(action);
      break;
    }
    case T.ActionType.End: {
      this.pathEnd(action);
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

  private pathStart(action: Action): void {
    const pathId: string = `${action[0]}`;
    const pathElement: HTMLElement = this.dom.getPathElement(
      pathId,
    ) as HTMLElement;

    pathElement.style.stroke = '#000';
    pathElement.style.strokeWidth = `${this.viewport.unit}`;
    pathElement.style.fill = 'none';
    pathElement.style.strokeLinejoin = 'round';
    this.appendPath(pathId, pathElement, `M${action[2]},${action[3]}`);
  }

  private pathMove(action: Action): void {
    const pathId: string = `${action[0]}`;
    const pathElement: Element = this.dom.getPathElement(pathId);
    const dValue: string = this.state[pathId] === STATE_LINE ?
      `${action[2]},${action[3]}` :
      `L${action[2]},${action[3]}`;
    this.state[pathId] = STATE_LINE;

    this.appendPath(pathId, pathElement, dValue);
  }

  private pathEnd(action: Action): void {
    const pathId: string = `${action[0]}`;

    delete this.state[pathId];
  }
}
