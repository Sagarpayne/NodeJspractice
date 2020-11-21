require('express-async-errors');
const mongoose = require('mongoose');
const config = require('config');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
const morgan = require('morgan')
const error = require('./middleware/error');

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



process.on('uncaughtException', (ex) => {
  logger.error(ex.message, ex);
});
process.on('unhandledRejection', (ex) => {
  logger.error(ex.message, ex);
});

if (!config.get("jwtPrivateKey")) {
  console.error('Fatal Error', 'Kye not defined');

  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly', {
  useNewUrlParser: true, useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => {
    console.error('Could not connect to MongoDB...', err)

  }
  );

const p = Promise.reject(new Error('Thats how its begin'));
p.then(()=> console.log('Done'));

app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));