const encodeDecode = (string, type = 'encode', encodeType = 'base64') => {
    if (type == 'encode') {
        const result = new Buffer.from(string).toString(encodeType)
        return result
    } else if (type == 'decode') {
        const result = new Buffer.from(string, encodeType).toString('utf8')
        return result
    }
}

module.exports = {
    encodeDecode
}