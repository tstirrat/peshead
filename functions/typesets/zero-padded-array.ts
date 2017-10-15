/// <reference path="../@types/jbinary.d.ts" />
import jBinary = require('jbinary');

export const ZeroPaddedArray = (jBinary as any).Template({
  params: ['baseType', 'maxLength', 'actualLength'],
  read() {
    const maxLength = this.toValue(this.maxLength);
    const actualLength = this.toValue(this.actualLength);

    // read everything up to maxLength (so that next section aligns correctly)
    const result = new Array(actualLength);
    for (let i = 0; i < maxLength; i++) {
      const entry = this.baseRead();

      // return everything before the zero padding
      if (i < actualLength) {
        result[i] = entry;
      }
    }

    // truncate the padded items
    return result;
  },
  write(values: any[]) {
    values.forEach(v => this.baseWrite(v));
    // TODO: write zero padded entries with the same entry size
  }
});
