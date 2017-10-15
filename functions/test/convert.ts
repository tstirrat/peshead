/// <reference path="../@types/jbinary.d.ts" />
import jBinary = require('jbinary');

import {EditFile} from '../typesets/edit-file';

const fileName = process.argv[2];

if (!fileName) {
  console.log('Usage: convert <edit-file>');
  process.exit(1);
}


jBinary.load(fileName, EditFile)
    .then((jb: jBinary) => {
      const file = jb.readAll();
      console.log(file.teams.map((v: any) => v.name));
      process.exit(0);
    })
    .catch((err: Error) => {
      console.error(err);
      process.exit(1);
    });
