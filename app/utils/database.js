const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rem:paws2020@paws-and-stripes.ovdm3cw.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

  module.exports = mongoose.connection;