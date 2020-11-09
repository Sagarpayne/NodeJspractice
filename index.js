const strtupdebugger =require('debug')('app:startup');
const dbdebugger =require('debug')('app:db');
const Joi = require('joi');
const config = require('config');
const helmet = require('helmet');
const logger = require('./middleware/logger')
const morgan = require('morgan');
const express = require('express');
const courses =require('./routes/courses');
const home =require('./routes/home');

const app = express(); 
 

console.log(process.env.NODE_ENV);
console.log(app.get('env'));

app.set('view engine','pug');
app.set('views','./views'); //default

app.use(logger);
app.use(express.json());  //req.body
app.use(express.urlencoded({ extended: true }));  //key value pair
app.use(express.static('public'));
app.use(helmet());



console.log('App Name : ' + config.get('name'));
console.log('App Host mail : ' + config.get('mail.host'));
console.log(app.get('env'));
if (app.get('env') === 'development') {
    console.log('dfsdfsd');
    app.use(morgan('tiny'));
    strtupdebugger('Moragan enabled..');
}

app.use(function (req, res, next) {
    console.log('Auth ...');
    next();
});
app.use('/api/courses',courses);
app.use('/',home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));