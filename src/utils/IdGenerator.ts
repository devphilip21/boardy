export default class IdGenerator {
  private id: number;

  constructor() {
    this.id = 0;
  }

  public get() {
    return ++this.id;
  }

  static hashStringToNumber(str: String): number {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    }
    return Math.abs(h);
  }
}
