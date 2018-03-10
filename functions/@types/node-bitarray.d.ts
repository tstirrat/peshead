declare module 'node-bitarray' {
  class BitArray extends Array<number> {
    /**
     * Return a new BitArray instance. Added for use in
     * Array.map(), if a buffer is passed in, the asOctet will always be set to
     * true.
     */
    static factory(
      bitArray: number[],
      length?: number,
      asOctet?: boolean
    ): BitArray;

    /**
     * Convert a 32bit integer into a bit array, the asOctet will always be
     * set to true if a Buffer is passed in.
     */
    static parse(int32: number): BitArray;

    /** Zero fill an array until it represents an octet */
    static octet(bits: number[]): BitArray;

    static equals(a: BitArray, b: BitArray): boolean;

    static fromBuffer(buffer: Buffer): BitArray;

    static toDecimal(bitArray: number[]): number;
    static toNumber(bitArray: number[]): number;
  }

  export = BitArray;
}
