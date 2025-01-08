export interface Dog {
  /**
   * The size of the shape.
   *
   * @minimum 0
   * @maximum 100
   * @TJS-type integer
   */
  size: number;
  /**
   * @example "Labrador Retriever"
   * @TJS-type string
   * @pattern ^[A-Za-z\s]+$
   * @minLength 1
   * @maxLength 100
   */
  breed: string;
}
