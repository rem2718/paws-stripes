const mongoose = require('mongoose');
const debug = require('debug')('app:database');

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => debug('Connected to MongoDB'))
  .catch((err) => debug(err));

module.exports = mongoose.connection;