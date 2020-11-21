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
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.MongoDB({ db: 'mongodb://localhost/vidly' }),
    ],
  });


module.exports =function(err,req,res,next){
    logger.error('Hello again distributed logs',err);
    res.status(500).send('Some Error ' + err);
    next();
}