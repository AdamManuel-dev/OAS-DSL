export interface Pet {
  /**
   * @example "Murphy"
   * @TJS-type string
   * @pattern ^[A-Za-z\s]+$
   * @minLength 1
   * @maxLength 100
   */
  name: string;
}
