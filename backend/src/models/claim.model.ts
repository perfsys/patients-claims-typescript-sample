import mongoose from "mongoose";

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
});

export const Claim = mongoose.model("Claim", claimSchema);
