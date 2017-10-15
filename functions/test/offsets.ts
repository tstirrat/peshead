import {open, read} from 'fs-extra';

const ATTRIB_NAMES = [
  'Age',
  'Stronger Foot',
  'Height',
  'Weight',
  'Attacking Prowess',
  'Ball Control',
  'Dribbling',
  'Low Pass',
  'Lofted Pass',
  'Finishing',
  'Set Piece Taking',
  'Curve',
  'Header',
  'Defensive Prowess',
  'Ball Winning',
  'Kicking Power',
  'Speed',
  'Explosive Power',
  'Body Control',
  'Physical Contact',
  'Jump',
  'Goalkeeping',
  'Catching',
  'Clearing',
  'Reflexes',
  'Coverage',
  'Stamina',
  'NonDom Leg Usage',
  'NonDom Leg Prec.',
  'Condition',
  'Injury Resistance',
];

interface FileDef {
  name: string;
  attrs: number[];
}

const KNOWN_FILES: FileDef[] = [
  {
    name: './functions/test/A.HUGHES.bin',
    attrs: [
      38,   // Age
      0,    // Stronger Foot
      183,  // Height
      78,   // Weight
      56,   // Attacking Prowess
      68,   // Ball Control
      62,   // Dribbling
      70,   // Low Pass
      68,   // Lofted Pass
      59,   // Finishing
      55,   // Set Piece Taking
      62,   // Curve
      80,   // Header
      82,   // Defensive Prowess
      78,   // Ball Winning
      69,   // Kicking Power
      59,   // Speed
      57,   // Explosive Power
      69,   // Body Control
      81,   // Physical Contact
      73,   // Jump
      40,   // Goalkeeping
      40,   // Catching
      40,   // Clearing
      40,   // Reflexes
      40,   // Coverage
      71,   // Stamina
      2,    // NonDom Leg Usage
      2,    // NonDom Leg Prec.
      4,    // Condition
      1,    // Injury Resistance
    ],
  },
  {
    name: './functions/test/G.BARRY.bin',
    attrs: [
      36,   // Age
      1,    // Stronger Foot
      183,  // Height
      78,   // Weight
      68,   // Attacking Prowess
      77,   // Ball Control
      69,   // Dribbling
      80,   // Low Pass
      77,   // Lofted Pass
      67,   // Finishing
      76,   // Set Piece Taking
      74,   // Curve
      72,   // Header
      78,   // Defensive Prowess
      76,   // Ball Winning
      79,   // Kicking Power
      63,   // Speed
      67,   // Explosive Power
      68,   // Body Control
      79,   // Physical Contact
      74,   // Jump
      40,   // Goalkeeping
      40,   // Catching
      40,   // Clearing
      40,   // Reflexes
      40,   // Coverage
      70,   // Stamina
      2,    // NonDom Leg Usage
      3,    // NonDom Leg Prec.
      7,    // Condition
      2,    // Injury Resistance
    ],
  },
  {
    name: './functions/test/M.OWEN.bin',
    attrs: [
      19,   // Age
      0,    // Stronger Foot
      173,  // Height
      70,   // Weight
      86,   // Attacking Prowess
      84,   // Ball Control
      86,   // Dribbling
      75,   // Low Pass
      57,   // Lofted Pass
      89,   // Finishing
      60,   // Set Piece Taking
      70,   // Curve
      76,   // Header
      46,   // Defensive Prowess
      41,   // Ball Winning
      82,   // Kicking Power
      88,   // Speed
      90,   // Explosive Power
      85,   // Body Control
      60,   // Physical Contact
      79,   // Jump
      40,   // Goalkeeping
      40,   // Catching
      40,   // Clearing
      40,   // Reflexes
      40,   // Coverage
      78,   // Stamina
      2,    // NonDom Leg Usage
      2,    // NonDom Leg Prec.
      6,    // Condition
      1,    // Injury Resistance
    ],
  },
  // {
  //   name: './functions/test/CASILLAS.bin',
  //   attrs: [
  //     58,  // Attacking Prowess
  //     65,  // Ball Control
  //     64,  // Dribbling
  //     70,  // Low Pass
  //     74,  // Lofted Pass
  //     56,  // Finishing
  //     58,  // Set Piece Taking
  //     69,  // Curve
  //     70,  // Header
  //     69,  // Defensive Prowess
  //     62,  // Ball Winning
  //     82,  // Kicking Power
  //     71,  // Speed
  //     68,  // Explosive Power
  //     62,  // Body Control
  //     86,  // Physical Contact
  //     86,  // Jump
  //     89,  // Goalkeeping
  //     82,  // Catching
  //     82,  // Clearing
  //     91,  // Reflexes
  //     90,  // Coverage
  //     70,  // Stamina
  //     1,   // NonDom Leg Usage
  //     2,   // NonDom Leg Prec.
  //     5,   // Condition
  //     1,   // Injury Resistance
  //   ],
  // },
];

async function detectOffsets(files: FileDef[]) {
  const toBuffer = files.map(f => open(f.name, 'r').then(fDescriptor => {
    const buffer = new Buffer(188);
    return read(fDescriptor, buffer, 0, 188, 0).then(result => {
      console.log('read', f.name, result.bytesRead);
      return buffer;
    });
  }));

  try {
    const buffers = await Promise.all(toBuffer);
    const offsets = {};
    buffers.forEach((bytes, i) => {
      bytes.forEach((byte, byteIndex) => {
        const file = files[i];
        const foundIndex = file.attrs.indexOf(byte);
        if (foundIndex > -1) {
          const attrName = ATTRIB_NAMES[foundIndex];
          console.log(
              `found ${attrName} in ${file.name} at index: ${byteIndex}`);
          offsets[attrName] = offsets[attrName] || [];
          offsets[attrName].push(byteIndex);
        }
      });
    });

    Object.keys(offsets).forEach(attrName => offsets[attrName].sort());
    console.log(offsets);

    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

detectOffsets(KNOWN_FILES);


/*
const nibbles = bytes.reduce(
          (acc, byte) => acc.concat(splitByteLE(byte)), [] as number[]);
      nibbles.forEach((nibble, nibbleIndex) => {
        const file = files[i];
        const foundIndex = file.attrs.indexOf(nibble);
        if (foundIndex > -1) {
          const attrName = ATTRIB_NAMES[foundIndex];
          console.log(
              `found ${attrName} in ${file.name} at index: ${nibbleIndex}`);
          offsets[attrName] = offsets[attrName] || [];
          offsets[attrName].push(nibbleIndex);
        }
      });

function splitByteLE(byte: number): number[] {
  const num = byte & 0xFF;  // ensure 8 bit
  const lo = num & 0xF;
  const hi = num >> 4;
  return [lo, hi];
}
*/
