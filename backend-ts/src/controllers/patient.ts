import {Request, Response} from "express";

import {Patient} from "../models/patient.model";

export const save = (req: Request, res: Response) => {
    const patient = new Patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        sex: req.body.sex,
        address: req.body.address,
        email: req.body.email
    });

    patient
        .save(err => {
            if (err) {
                res.status(500);
                res.json({"status": "Error"});
            } else {
                res.json({"status": "Success"});
            }
        });
};

export const getAll = (req: Request, res: Response) => {
    Patient.find((err, patients) => {
        if (err) {
            res.status(500);
            res.json({"status": "Error"});
        }
        res.json(patients);
    });
};

