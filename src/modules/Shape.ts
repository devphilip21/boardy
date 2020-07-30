import IdGenerator from '@/utils/IdGenerator';
import {ShapeMap, ShapeStyle} from '@/@types/global.d';

export default class Shape {
  private map: ShapeMap;

  constructor() {
    this.map = {
      [IdGenerator.hashStringToNumber('default')]: {
        stroke: '#000',
        strokeWidth: '1',
      },
    };
  }

  public add(key: string, styles: ShapeStyle) {
    this.map[IdGenerator.hashStringToNumber(key)] = styles;
  }

  public get(hash: number): ShapeStyle {
    return this.map[hash];
  }
}
