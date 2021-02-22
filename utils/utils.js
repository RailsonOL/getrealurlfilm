const httpStatus = require('http-status-codes')

const encodeDecode = (string, type = 'encode', encodeType = 'base64') => {
    if (type == 'encode') {
        const result = new Buffer.from(string).toString(encodeType)
        return result
    } else if (type == 'decode') {
        const result = new Buffer.from(string, encodeType).toString('utf8')
        return result
    }
}

const responseJson = (res, data, statusCode = httpStatus.OK) => {
    res.setHeader('Cache-Control', 's-maxage=72000000, stale-while-revalidate')
    res.status(200);
    return res.json(data);
}

const responseErrorJson = (res, methodName, error, statusCode = httpStatus.INTERNAL_SERVER_ERROR) => {
    res.status(error.httpCode || statusCode)
    console.error(methodName, error.message)
    return res.json({
        error: error.message || error.toString()
    })
}

module.exports = {
    responseErrorJson,
    responseJson,
    encodeDecode
}