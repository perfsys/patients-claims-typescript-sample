const express = require('express');
const database = require('../database')
const router = express.Router();
const mongoose = require('mongoose');
const conn = mongoose.connection;
const Patient = mongoose.model('Patient');


router.get('/', (req, res) => {
  res.json('Hello world')
});


router.post('/', (req, res) => {

  const patient = new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    sex: req.body.sex,
    address: req.body.address,
    email: req.body.email
  })

  patient
    .save(function (err) {
      if(err) {
        console.log("error", err)
      } else {
        console.log('patient created')
      }
        conn.close()
    })
});

router.get('/get', function(req, res) {
  Patient.find(function(err, patients) {
    if (err) return res.error(err);
    res.json(patients);
  })
})

module.exports = router;