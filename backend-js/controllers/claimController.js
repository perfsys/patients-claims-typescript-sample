const express = require('express');
const mongoose = require('../database')
const router = express.Router();
const Claim = mongoose.model('Claim');


router.get('/', (req, res) => {
    res.json('Hello world')
});


router.post('/', (req, res) => {
  const claim = new Claim({
    patient: req.body.patient,
    icdCodes: req.body.icdCodes,
    procedures: req.body.procedures
  })

  claim
    .save(function (err) {
      if(err) {
        console.log("error", err)
      } else {
        console.log('claim created')
          res.status(200);
          res.send('Success');
      }
    })
});

router.get('/get', function(req, res) {
  Claim.find(function(err, claims) {
    if (err) return res.error(err);
    res.json(claims);
  })
})

module.exports = router;
