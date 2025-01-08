export interface Pet {
  /**
   * @TJS-type string
   * @pattern ^[A-Za-z\s]+$
   * @minLength 1
   * @maxLength 100
   * @example "Murphy"
   */
  name: string;
}
