// tslint:disable:no-console
import { open, read } from 'fs-extra';
import BitArray = require('node-bitarray');

const BITS_PER_BYTE = 8;

interface Offset {
  offset: number;
  values: number[];
}

export async function search(
  bitLength: number,
  target: number,
  files: string[]
) {
  const toBuffer = files.map(fileName =>
    open(fileName, 'r').then(fHandle => {
      const buffer = new Buffer(188);
      return read(fHandle, buffer, 0, 188, 0).then(() => buffer);
    })
  );

  try {
    const buffers = await Promise.all(toBuffer);
    const bitArrays = buffers.map(b => BitArray.fromBuffer(b));
    const master = bitArrays[0];

    // binaryDump(master, 32);

    const offsets: Offset[] = [];
    let startIndex = 0;
    const maxIndex = master.length - 1 - bitLength;
    while (startIndex <= maxIndex) {
      const value = getValue(master, startIndex, bitLength);

      if (value === target) {
        const values = [
          value,
          ...getOtherValues(bitArrays, startIndex, bitLength)
        ];
        const offset = getByteOffset(startIndex);
        offsets.push({ offset, values });
      }
      startIndex++;
    }

    offsets.forEach(o => console.log(o.offset, o.values));

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

function getValue(
  bitArray: number[],
  startIndex: number,
  bitLength: number
): number {
  let bits = bitArray.slice(startIndex, startIndex + bitLength);

  // if this crosses byte boundary, we need to reverse byte order
  const bitOffset = startIndex % BITS_PER_BYTE;
  if (bitOffset + bitLength > BITS_PER_BYTE) {
    bits = reverseBytesAndExtract(bitArray, startIndex, bitLength);
  }

  bits.reverse(); // required because toNumber is LE yet most of library is BE
  return BitArray.toNumber(bits);
}

function getOtherValues(
  bitArrays: number[][],
  startIndex: number,
  bitLength: number
): number[] {
  const others = bitArrays.slice(1);
  return others.map(bitArray => getValue(bitArray, startIndex, bitLength));
}

function getByteOffset(bitIndex: number) {
  const bytes = Math.floor(bitIndex / BITS_PER_BYTE);
  const bits = bitIndex % BITS_PER_BYTE;
  // const bitString = bits > 0 ? `+${bits}` : '';
  // return `${bytes}${bitString}`;
  return 1.0 * bytes + 0.1 * bits;
}

/**
 * Reverse bytes within an alignment unit, extract a bit array from reversed
 * bytes.
 */
function reverseBytesAndExtract(
  bitArray: number[],
  startIndex: number,
  bitLength: number,
  byteAlignment = 4
): number[] {
  const blockSize = byteAlignment * BITS_PER_BYTE;
  const boundaryStart = Math.floor(startIndex / BITS_PER_BYTE / byteAlignment);
  const blockStartIndex = startIndex % blockSize;

  let reversed: number[] = [];
  const block = bitArray.slice(boundaryStart, boundaryStart + blockSize);
  // binaryDump(block);
  while (block.length) {
    const byte = block.splice(0, BITS_PER_BYTE);
    reversed = [...byte, ...reversed];
  }
  // binaryDump(reversed);
  return reversed.slice(blockStartIndex, blockStartIndex + bitLength);
}

function binaryDump(arr: BitArray, lineLength = 32) {
  const copy = arr.slice();

  const rows: string[] = [];
  while (copy.length) {
    const line = copy.splice(0, lineLength);

    const bytes: string[] = [];
    while (line.length) {
      const byte = line.splice(0, BITS_PER_BYTE);
      bytes.push(byte.join('')); // [1,1,0] -> 110
    }
    rows.push(bytes.join(' ')); // ['110', '111' ] -> 110 111
  }
  rows.forEach(row => console.log(row));
}
