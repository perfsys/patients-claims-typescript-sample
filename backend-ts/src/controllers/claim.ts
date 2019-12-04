import {Request, Response} from "express";

import {Claim} from "../models/claim.model";

export const save = (req: Request, res: Response) => {
    const claim = new Claim({
        patient: req.body.patient,
        icdCodes: req.body.icdCodes,
        procedures: req.body.procedures
    });

    claim
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
    Claim.find((err, claims) => {
        if (err) {
            res.status(500);
            res.json({"status": "Error"});
        }
        res.json(claims);
    });
};

