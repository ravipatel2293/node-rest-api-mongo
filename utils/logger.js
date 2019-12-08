 
const logger = require('pino')()
const moment = require('moment')

let captureError = (errorMessage, errorOrigin, errorLevel) => {
  let currentTime = moment()

  let errorResponse = {
    timestamp: currentTime,
    errorMessage: errorMessage,
    errorOrigin: errorOrigin,
    errorLevel: errorLevel
  }

  logger.error(errorResponse)
  return errorResponse
} // end captureError

let captureInfo = (message, origin, importance) => {
  let currentTime = moment()

  let infoMessage = {
    timestamp: currentTime,
    message: message,
    origin: origin,
    level: importance
  }

  logger.info(infoMessage)
  return infoMessage
} // end infoCapture

module.exports = {
  error: captureError,
  info: captureInfo
}