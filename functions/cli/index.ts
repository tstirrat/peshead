// tslint:disable:no-console
import { load } from './load';
import { search } from './search';

const command = process.argv[2];

const USAGE = `
Usage: pesleagues <command> [args]

Commands:
  load <file-name> <record-type> [limit = 100] [offset = 0] [batchSize = 100]
      Loads an EDIT00000000 file into the DB.

  search <bit-length> <needle> <file1> [<file2>,  <filen>...]
      Searches several bin files for a target number, returns the binary offset
      plus the value of target number in all other files at the same offset.
      Used for discovering binary offsets.
`;

// default action, do nothing
let action: Promise<void> | undefined = undefined;

if (command === 'load') {
  const fileName = process.argv[3];
  const recordType = process.argv[4];
  const limit = process.argv[5] ? Number(process.argv[5]) : undefined;
  const offset = process.argv[6] ? Number(process.argv[6]) : undefined;
  const chunkSize = process.argv[7] ? Number(process.argv[7]) : undefined;
  if (fileName && recordType) {
    action = load(fileName, recordType, limit, offset, chunkSize);
  }
}
if (command === 'search') {
  const bitLength = Number(process.argv[3]);
  const target = Number(process.argv[4]);
  const files = process.argv.slice(5);
  console.log(bitLength, target, files);
  if (bitLength && target && files.length) {
    action = search(bitLength, target, files);
  }
}

if (action) {
  action
    .then(() => {
      process.exit(0);
    })
    .catch((err: Error) => {
      console.log(err);
      process.exit(1);
    });
} else {
  console.log(USAGE);
}
