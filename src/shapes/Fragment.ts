import Shape from './Shape';

/**
 * Empty Shape
 *   - only for grouping or notifier
 */
export default class Fragment extends Shape {
  serializeThis() {
    return null;
  }
}
