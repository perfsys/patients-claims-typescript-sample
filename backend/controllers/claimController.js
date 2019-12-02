const express = require('express');
const database = require('../database')
const router = express.Router();
const mongoose = require('mongoose');
const Claim = mongoose.model('Claim');


router.get('/', (req, res) => {
  res.json('Hello world')
});


router.post('/', (req, res) => {
  console.log("req.body", req.body)
  console.log("req.body.patient", req.body.patient)
  console.log("req.body.icdCodes", req.body.icdCodes)
  console.log("req.body.procedures", req.body.procedures)

  const claim = new Claim({
    patient: req.body.patient,
    icdCodes: req.body.icdCodes,
    procedures: req.body.procedures
  })

  // console.log('works function patient', patient)

  claim
    .save(function (err) {
      if(err) {
        console.log("error", err)
      } else {
        console.log('WORKS CLAIM!!!!!')
      }

    })
});

router.get('/get', function(req, res) {
  Claim.find(function(err, claims) {
    if (err) return res.error(err);
    console.log(claims);
    res.json(claims);
  })
})

module.exports = router;
