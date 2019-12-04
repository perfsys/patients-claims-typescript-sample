const mongoose = require('mongoose');
require('./models/patient.model');
require('./models/claim.model');

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if(!err) {
    console.log('MongoDB connection succeeded.');
    fillDb();
  } else {console.log('Error in DB connection:' + err)}
})


fillDb = () => {
  const Patient = mongoose.model('Patient');
  const Claim = mongoose.model('Claim');

  let testPatients = [
    {
      firstName: "Johm",
      lastName: "Smith",
      sex: "male",
      address: "New York",
      email: "john@gmail.com"  
    },
    {
      firstName: "James",
      lastName: "Johnson",
      sex: "male",
      address: "Atlanta",
      email: "jjonson@gmail.com"  
    },
    {
      firstName: "Sandra",
      lastName: "Reed",
      sex: "female",
      address: "San Francisco",
      email: "s.reed@gmail.com"  
    },
    {
      firstName: "Emily",
      lastName: "Jones",
      sex: "female",
      address: "Los Angeles",
      email: "emily.jones@gmail.com"  
    },
    {
      firstName: "Robert",
      lastName: "Mitchell",
      sex: "female",
      address: "New York",
      email: "r.mitchell@gmail.com"  
    },
    {
      firstName: "Jennifer",
      lastName: "Brown",
      sex: "female",
      address: "New York",
      email: "j.brown@gmail.com"  
    },
    {
      firstName: "Jessica",
      lastName: "Taylor",
      sex: "female",
      address: "Los Angeles",
      email: "j.teylor@gmail.com"  
    },
    {
      firstName: "William	",
      lastName: "Evans",
      sex: "male",
      address: "Dallas",
      email: "w.evans@gmail.com"  
    },
    {
      firstName: "Thomas",
      lastName: "Anderson",
      sex: "male",
      address: "Dallas",
      email: "t.anderson@gmail.com"  
    },
    {
      firstName: "Matthew",
      lastName: "Clark",
      sex: "male",
      address: "Los Angeles",
      email: "m.clark@gmail.com"  
    },
    {
      firstName: "Betty",
      lastName: "Murphy",
      sex: "female",
      address: "Chicago",
      email: "b.murphy@gmail.com"  
    },
    {
      firstName: "Donna",
      lastName: "Lewis",
      sex: "female",
      address: "Chicago",
      email: "d.lewis@gmail.com"  
    },
    {
      firstName: "Mark",
      lastName: "Rogers",
      sex: "male",
      address: "Seattle",
      email: "m.rogers@gmail.com"  
    },
    {
      firstName: "Melissa	",
      lastName: "Bell",
      sex: "female",
      address: "Los Angeles",
      email: "m.bell@gmail.com"  
    },
    {
      firstName: "Paul",
      lastName: "Jenkins",
      sex: "male",
      address: "Seattle",
      email: "paul.jenkins@gmail.com"  
    },
    {
      firstName: "Emma",
      lastName: "Russell",
      sex: "female",
      address: "Atlanta",
      email: "emma.russell@gmail.com"  
    },
    {
      firstName: "Ryan",
      lastName: "Wood",
      sex: "male",
      address: "Boston",
      email: "r.wood@gmail.com"  
    },
    {
      firstName: "Stephen",
      lastName: "Ross",
      sex: "male",
      address: "Atlanta",
      email: "s.ross@gmail.com"  
    },
    {
      firstName: "Gregory",
      lastName: "Sanders",
      sex: "male",
      address: "Boston",
      email: "g.sanders@gmail.com"  
    },
    {
      firstName: "Helen",
      lastName: "Brooks",
      sex: "female",
      address: "Boston",
      email: "h.brooks@gmail.com"  
    },
  ];

  testClaim = [
    {
      patient: "Helen Brooks",
      icdCodes: ["A0105", "A030", "A0220"],
      procedures: ["17374"]
    },
    {
      patient: "Ryan Wood",
      icdCodes: ["A011"],
      procedures: ["11120", "18017"]
    }
  ]


  for( let i = 0; i < testPatients.length; i++) {
    console.log("testPatients", testPatients[i])
    const patient = new Patient(testPatients[i])
    patient
      .save(function (err) {
        if(err) {
          console.log("error", err)
        } else {
          console.log('patient created')
            // res.status(200);
            // res.send('Success');
        }
      })
  }

  for( let i = 0; i < testClaim.length; i++) {
    console.log("testClaim", testClaim[i])
    const claim = new Claim(testClaim[i])
    claim
      .save(function (err) {
        if(err) {
          console.log("error", err)
        } else {
          console.log('claim created')
            // res.status(200);
            // res.send('Success');
        }
      })
  }
}



module.exports = mongoose;

