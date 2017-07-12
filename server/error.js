'use strict'
const util = require('util')
exports.JsonError = JsonError
exports.PageError = PageError

var AbstractError = function(code, msg, constr){
	Error.captureStackTrace(this, constr || this)
	this.message = msg || 'Error',
	this.code = code || '10001'
}
util.inherits(AbstractError, Error)

function JsonError(code, message){
	JsonError.super_.call(this, code, message, this.constructor)
}
util.inherits(JsonError, AbstractError)

function PageError(message){
	PageError.super_.call(this, message, this.constructor)
}
util.inherits(PageError, AbstractError)