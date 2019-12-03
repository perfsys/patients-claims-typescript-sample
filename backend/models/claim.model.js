const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  patient: {
    type: String
  },
  icdCodes: {
    type: [String]
  },
  procedures: {
    type: [String]
  }
})

mongoose.model('Claim', claimSchema)
