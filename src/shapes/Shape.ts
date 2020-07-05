/**
 * Shape (abstract)
 *   - observable
 *   - tree structure
 *   - serialize
 */
export default abstract class Shape {
  protected children: Shape[];
  protected observers: T.Observer[];

  constructor() {
    this.children = [];
    this.observers = [];
  }

  public addChild(child: Shape) {
    const index: number = this.children.length;
    const removeChild: T.RemoveChild = () => {
      this.children.splice(index, 1);
    };

    this.children.push(child);
    child.registerObserver((payload) => {
      this.notify(payload);
    });

    return removeChild;
  }

  public registerObserver(observer: T.Observer): T.Unregister {
    const index: number = this.children.length;
    const unregister: T.Unregister = () => {
      this.observers.splice(index, 1);
    };

    this.observers.push(observer);

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

  protected notify(payload: T.ObserverPayload) {
    // eslint-disable-next-line guard-for-in
    for (let i = 0; i < this.observers.length; ++i) {
      this.observers[i](payload);
    }
  }
}
