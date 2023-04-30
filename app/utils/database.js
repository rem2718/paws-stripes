const mongoose = require('mongoose');
const debug = require('debug')('app:database');
debug('here');
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => debug('Connected to MongoDB'))
  .catch((err) => console.error(err));

module.exports = mongoose.connection;