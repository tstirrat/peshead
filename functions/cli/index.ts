import {load} from './load';

const command = process.argv[2];
const fileName = process.argv[3];


const USAGE = `
Usage: pesleagues <command> [args]

Commands:
  load <file-name>
      Loads an EDIT00000000 file into the DB.`;

// default action is to reject with usage
let action: Promise<void> = Promise.reject(new Error(USAGE));

if (command === 'load') {
  if (fileName) {
    action = load(fileName);
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
