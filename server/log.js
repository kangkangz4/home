'use strict'
const path = require('path')
const log4js = require('koa-log4')
const logDir = path.join(__dirname, 'logs') //配置路径logs

//生成logs目录
try{
	require('fs').mkdirSync(logDir)
}catch(err){
	if(err.code !== 'EEXIST'){
		console.error('Could not set up log directory, error was: ', err)
		process.exit(1)
	}
}

//根据log配置文件(log4js.json)配置日志文件
log4js.configure(path.join(__dirname, 'log4js.json'), {cwd:logDir})
//注册日志
const logger = log4js.getLogger('startup')
//输入日志
logger.info('logs config finished!')