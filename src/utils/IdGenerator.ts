export default class IdGenerator {
  private id: number;

  constructor() {
    this.id = 0;
  }

  get() {
    return ++this.id;
  }
}
