import {EventChannel, debounce} from '@/utils';

export type IntializeOption = {
  debounceTime: number // millisecond
}

export type ResizePayload = {
  width: number,
  height: number,
}

export default class ResizeObserver extends EventChannel<ResizePayload> {
  private element: HTMLElement;

  constructor(elementToBeObserved: HTMLElement, {debounceTime}: IntializeOption) {
    super();

    this.handleResize = debounce(this.handleResize, debounceTime);
    this.element = elementToBeObserved;
    window.addEventListener('resize', this.handleResize);
  }

  public destroy() {
    window.removeEventListener('resize', this.handleResize);
  }

  private readonly handleResize = () => {
    const width: number = this.element.offsetWidth;
    const height: number = this.element.offsetHeight;

    this.emit({width, height});
  }
}
