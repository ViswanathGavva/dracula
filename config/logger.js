var winston = require('winston');
winston.emitErrs = true;

var debuglogger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'debug',
            filename: process.cwd()+'/app/logs/debug.log',
            name:'debuglog',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        })],
        exitOnError:true
        });
var infologger = new winston.Logger({
    transports: [       
        new winston.transports.File({
            level: 'info',
            filename: process.cwd()+'/app/logs/info.log',
            name: 'infolog',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            //maxsize: 524, //5MB
            maxFiles: 5,
            colorize: false
        })],
        exitOnError:true
        });
var errorlogger = new winston.Logger({
    transports: [        
        new winston.transports.File({
            level: 'error',
            filename: process.cwd()+'/app/logs/error.log',
            name:'errorlog',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            //maxsize: 524, //5MB
            maxFiles: 5,
            colorize: false
        })],
    exitOnError: true
});

var logger = {
	debug: function(msg,jsonobj){
		debuglogger.debug(msg,jsonobj);
	},
	info: function(msg,jsonobj){
		infologger.info(msg,jsonobj);
	},
	error:function(msg,jsonobj){
		errorlogger.error(msg,jsonobj);
	},
	log:function(level,msg){
		var lvl= logger[level];
		lvl(msg);
	}
};


module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};