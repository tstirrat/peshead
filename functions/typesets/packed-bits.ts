import jBinary = require('jbinary');

export interface Definition {
  key: string;
  bits: number;
}

interface ExpandedProps {
  [x: string]: number;
}

// TODO(tstirrat/pesleagues#1): Fix jBinary types
export const PackedBits = (jBinary as any).Template({
  params: ['baseType', 'definition'],

  read() {
    const bitLength: number = this.toValue(this.bitLength) || 32;
    const definition: Definition[] = this.toValue(this.definition);
    // console.log(this.baseType);
    let packed: number = this.baseRead();

    const result: ExpandedProps = {};
    definition.forEach(({ key, bits }) => {
      const value = getRightMostBits(packed, bits);
      result[key] = value;
      packed = packed >>> bits;
    });
    return result;
  },

  write(values: ExpandedProps) {
    const definition: Definition[] = this.toValue(this.definition);
    const value = definition.reduce((acc, def) => {
      return values[def.key]; // TODO: actually write correct bits.
    }, 0);
    this.baseWrite(value);
  }
});

/** Get the right most bits of a number */
export function getRightMostBits(packed: number, n: number): number {
  //     11000000  number
  //  &  01111111  (1 << n) -1
  // ————————————
  //     01000000
  const mask = (1 << n) - 1;
  return packed & mask;
}
