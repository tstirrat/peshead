#!/usr/bin/env python
import sys

fileA = sys.argv[1]
fileB = sys.argv[2]
outputFile = "tmp/" + fileB + ".xor"

def str_xor(data, key):
    for i in range(len(data)):
        data[i] ^= key[i % len(key)]
    return data
key  = bytearray(open(fileA, 'rb').read())
data = bytearray(open(fileB,  'rb').read())
encoded = str_xor(data, key)
open(outputFile, "wb").write(encoded)
print("output to " + outputFile)
