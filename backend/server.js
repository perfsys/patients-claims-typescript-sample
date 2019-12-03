// server.js
require('./database');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const patientController = require('./controllers/patientController');
const claimController = require('./controllers/claimController');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/patient', patientController);
app.use('/claim', claimController);

app.listen(port, () => {
  console.log('We are live on ' + port);
});
