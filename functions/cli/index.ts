// tslint:disable:no-console
import { load } from './load';
import { search } from './search';

const command = process.argv[2];

const USAGE = `
Usage: pesleagues <command> [args]

Commands:
  load <file-name>
      Loads an EDIT00000000 file into the DB.

  search <bit-length> <needle> <file1> [<file2>,  <filen>...]
      Searches several bin files for a target number, returns the binary offset
      plus the value of target number in all other files at the same offset.
      Used for discovering binary offsets.
`;

// default action is to reject with usage
let action: Promise<void> = Promise.reject(new Error(USAGE));

if (command === 'load') {
  const fileName = process.argv[3];
  if (fileName) {
    action = load(fileName);
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

action
  .then(() => {
    process.exit(0);
  })
  .catch((err: Error) => {
    console.log(err);
    process.exit(1);
  });
