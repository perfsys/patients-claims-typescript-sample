import request from "supertest";
import app from "../src/app";
import { expect} from "chai";

describe("GET /patient/get", () => {
    it("should return 200 OK", (done) => {
        request(app).get("/patient/get")
            .expect(200, done);
    });
});

describe("POST /patient", () => {
    it("should return false from assert when no message is found", (done) => {
        request(app).post("/patient")
            .field("firstName", "John")
            .field("lastName", "Smith")
            .field("sex", "male")
            .field("address", "New York")
            .field("email", "john@gmail.com")
            .end((err, res) => {
                expect(res.error).to.be.false;
                done();
            })
            .expect(200, done);

    });
});