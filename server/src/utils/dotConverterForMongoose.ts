function encodeKey(key: string) {
    return key.replace(/\./g, "_");
}

function decodeKey(key: string) {
    return key.replace(/_/g, ".");
}


export const converter = {
    encodeKey,
    decodeKey
}