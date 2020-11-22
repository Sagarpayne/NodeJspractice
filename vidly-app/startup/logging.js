require('express-async-errors');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

require('winston-mongodb');
const logger = createLogger({
   
    level: 'info',
    format: combine(
        label({ label: 'right meow!' }),
        timestamp(),
        prettyPrint()
      ),
    defaultMeta: { service: 'Db' },
    transports: [
      new transports.MongoDB({ db: 'mongodb://localhost/vidly' }),
    ],
  });

module.exports = function(){


process.on('uncaughtException', (ex) => {
  logger.error(ex.message, ex);
});
process.on('unhandledRejection', (ex) => {
  logger.error(ex.message, ex);
});

    
}