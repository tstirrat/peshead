/// <reference path="../@types/jbinary.d.ts" />
import jBinary = require('jbinary');

export const ZeroPaddedArray = (jBinary as any).Template({
  params: ['baseType', 'maxLength', 'actualLength'],
  read() {
    const maxLength = this.toValue(this.maxLength);
    const actualLength = this.toValue(this.actualLength);

    // read everything up to maxLength
    const result = new Array(actualLength);
    for (let i = 0; i < maxLength; i++) {
      result[i] = this.baseRead();
    }

    console.log(`Read ${maxLength}, truncated to ${actualLength}`);
    // truncate the padded items
    return result.slice(0, actualLength);
  },
  write(values: any[]) {
    values.forEach(v => this.baseWrite(v));

  }
});
