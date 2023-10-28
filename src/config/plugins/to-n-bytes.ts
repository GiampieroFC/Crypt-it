export const toNBytes = (nBytes: number, key: string | number | Uint8Array | undefined) => {
    return Buffer.alloc(nBytes, key, 'binary');
}
