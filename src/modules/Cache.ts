import {NS_SVG} from '@/constants/markup';

// path can be big data
const PATH_CACHE_LIMIT = 100;

export default class Cache {
  private svgElement: Element;
  private elCache: { [pathId: string]: Element };
  private pathCache: { [pathId: string]: string };
  private svgId: string;
  private pathCacheLength: number;

  constructor(svgElement: Element) {
    this.svgElement = svgElement;
    this.elCache = {};
    this.pathCache = {};
    this.pathCacheLength = 0;
    this.svgId = svgElement.id;
  }

  public getPathElement(pathId: string): Element {
    // no cache hit, select
    if (!this.elCache[pathId]) {
      this.elCache[pathId] = this.svgElement
        .querySelector(`#${this.svgId}__${pathId}`);
    }

    // no cache hit, create
    if (!this.elCache[pathId]) {
      const newPathElement = document.createElementNS(NS_SVG, 'path');
      newPathElement.id = `${this.svgId}__${pathId}`;

      this.svgElement.append(newPathElement);
      this.elCache[pathId] = newPathElement;
    }

    return this.elCache[pathId];
  }

  public getPathD(pathId: string): string {
    if (!this.pathCache[pathId]) {
      const pathElement: Element = this.getPathElement(pathId);

      this.pathCache[pathId] = pathElement.getAttributeNS(null, 'd');
      this.pathCacheLength++;
    }

    // page replacement algorithm is cost... (unnecessary)
    if (this.pathCacheLength > PATH_CACHE_LIMIT) {
      this.pathCache = {};
      this.pathCacheLength = 0;
    }

    return this.pathCache[pathId];
  }

  public setPathD(pathId: string, dValue: string) {
    this.pathCache[pathId] = dValue;
  }
}
