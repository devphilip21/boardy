/**
 * Shape (abstract)
 *   - observable
 *   - tree structure
 *   - serialize
 */
export default abstract class Shape {
  protected children: Shape[];
  protected observers: { [key: string]: Boardy.Observer };
  private observerKey: number;

  constructor() {
    this.children = [];
    this.observers = {};
    this.observerKey = 0;
  }

  public registerObserver(observer: Boardy.Observer): Boardy.UnregisterFunc {
    const key: number = ++this.observerKey;
    const unregister: Boardy.UnregisterFunc = () => {
      delete this.observers[key];
    };

    this.observers[key] = observer;

    return unregister;
  }

  public serialize(): any {
    // t: this
    // c: children
    return {
      t: this.serializeThis(),
      c: this.children.map((c) => c.serialize()),
    };
  }

  public abstract serializeThis(): any
}
