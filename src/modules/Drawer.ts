import Cache from './Cache';
import {tenToThePowerOf} from '@/utils/math';
import {STATE_LINE} from '@/constants/state';
import {NS_SVG} from '@/constants/markup';
import * as T from '@/constants/action';

/**
 * draw path on svg element
 * - cache all doms in SVG Element, for improving render performance.
 */
export default class Drawer {
  private svgElement: Element;
  private resolution: [number, number];
  private cache: Cache;
  private state: { [pathId: string]: string }; // cache path-d
  private unit: number; // 1px by resolution width

  constructor(
    svgElement: Element,
    svgSize: [number, number],
    resolutionPowers: [number, number],
  ) {
    this.resolution = resolutionPowers.map(
      (power) => tenToThePowerOf(power),
    ) as [number, number];
    this.svgElement = svgElement;
    this.svgElement.setAttribute('width', `${svgSize[0]}`);
    this.svgElement.setAttribute('height', `${svgSize[1]}`);
    this.svgElement.setAttribute(
      'viewBox',
      `0 0 ${this.resolution[0]} ${this.resolution[1]}`,
    );
    this.cache = new Cache(this.svgElement);
    this.state = {};
    this.unit = this.resolution[0] / svgSize[0];
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
    const prevPath: string = this.cache.getPathD(pathId);
    const nextPath: string = prevPath ? `${prevPath} ${dValue}` : dValue;

    pathElement.setAttributeNS(null, 'd', nextPath);
    this.cache.setPathD(pathId, nextPath);
  }

  private lineStart(action: T.Action): void {
    const pathId: string = `${action[0]}`;
    const pathElement: HTMLElement = this.cache.getPathElement(
      pathId,
    ) as HTMLElement;

    pathElement.style.stroke = '#000';
    pathElement.style.strokeWidth = `${this.unit}`;
    this.appendPath(pathId, pathElement, `M${action[2]},${action[3]}`);
  }

  private lineMove(action: T.Action): void {
    const pathId: string = `${action[0]}`;
    const pathElement: Element = this.cache.getPathElement(pathId);
    const dValue: string = this.state[pathId] === STATE_LINE ?
      `${action[2]},${action[3]}` :
      `L${action[2]},${action[3]}`;
    this.state[pathId] = STATE_LINE;

    this.appendPath(pathId, pathElement, dValue);
  }

  private lineEnd(action: T.Action): void {
    const pathId: string = `${action[0]}`;
    const pathElement: Element = this.cache.getPathElement(pathId);

    delete this.state[pathId];
    this.appendPath(pathId, pathElement, 'Z');
  }
}
