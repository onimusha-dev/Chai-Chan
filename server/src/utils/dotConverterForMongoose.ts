function encodeKey(key: string) {
    return key.replace(/\./g, "_dot_").replace(/\$/g, "_dollar_");
}

function decodeKey(key: string) {
    return key.replace(/_dot_/g, ".").replace(/_dollar_/g, "$");
}


export const converter = {
    encodeKey,
    decodeKey
}