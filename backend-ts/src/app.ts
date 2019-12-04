import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import mongo from "connect-mongo";
import flash from "express-flash";
import mongoose from "mongoose";
import bluebird from "bluebird";
import {MONGODB_URI} from "./util/secrets";
import cors from "cors";

const MongoStore = mongo(session);

// Controllers (route handlers)
import * as patientController from "./controllers/patient";
import * as claimController from "./controllers/claim";


// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

const fillDb = () => {
    const Patient = mongoose.model("Patient");
    const Claim = mongoose.model("Claim");

    const testPatients = [
        {
            firstName: "John",
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
        }

    ];

    const testClaim = [
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
    ];


    for (let i = 0; i < testPatients.length; i++) {
        console.log("testPatients", testPatients[i]);
        const patient = new Patient(testPatients[i]);
        patient
            .save(function (err) {
                if (err) {
                    console.log("error", err);
                } else {
                    console.log("patient created");
                }
            });
    }

    for (let i = 0; i < testClaim.length; i++) {
        console.log("testClaim", testClaim[i]);
        const claim = new Claim(testClaim[i]);
        claim
            .save(function (err) {
                if (err) {
                    console.log("error", err);
                } else {
                    console.log("claim created");

                }
            });
    }
};


mongoose
    .connect(mongoUrl, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(
        () => {
            fillDb();
        },
    ).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

const router = express.Router();

const options: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "*",
    preflightContinue: false
};

//use cors middleware
app.use(cors(options));

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));


/**
 * Primary app routes.
 */
app.post("/patient", patientController.save);
app.get("/patient/get", patientController.getAll);
app.post("/claim", claimController.save);
app.get("/claim/get", claimController.getAll);


export default app;
