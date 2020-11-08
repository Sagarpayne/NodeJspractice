const EvenEmitter = require('events');


var url="my Url";

class Logger extends EvenEmitter{

    log(message){


        console.log(message);
        this.emit('messageLogged');
    }
}


module.exports = Logger;