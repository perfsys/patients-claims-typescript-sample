import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  birthday: {
    type: String
  },
  sex: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String
  }
});

export const Patient = mongoose.model("Patient", patientSchema);
