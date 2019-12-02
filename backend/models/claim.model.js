const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  patient: {
    type: String
  },
  icdCodes: {
    type: Array
  },
  procedures: {
    type: Array
  }
})

mongoose.model('Claim', claimSchema)
