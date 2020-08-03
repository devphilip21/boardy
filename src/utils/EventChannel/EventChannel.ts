export default class EventChannel<EventPayload> {
  protected handlers: ((e: EventPayload) => void)[];

  constructor() {
    this.handlers = [];
  }

  public on(handler: (e: EventPayload) => void) {
    this.handlers.push(handler);
  }

  public off(handler: (e: EventPayload) => void) {
    const handlerIndex = this.handlers.indexOf(handler);

    if (handlerIndex !== -1) {
      this.handlers.splice(handlerIndex, 1);
    }
  }

  public offAll() {
    this.handlers = [];
  }

  public emit(payload: EventPayload) {
    this.handlers.forEach((handler) => handler(payload));
  }
}
