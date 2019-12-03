const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/test', { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if(!err) {console.log('MongoDB connection succeeded.')}
  else {console.log('Error in DB connection:' + err)}
})

require('./models/patient.model')
require('./models/claim.model')
