const EvenEmitter = require('events');

const emitter = new EvenEmitter();




const Logger = require('./logger');


const logger = new Logger();

logger.on('messageLogged',function(){
    console.log('listner callaed')
})

logger.log('message');