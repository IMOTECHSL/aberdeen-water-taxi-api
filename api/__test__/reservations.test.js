"use strict";
const { expectCt } = require("helmet");
const request = require("supertest");
const app = require("../src/app");

const BASE_URL = "/api/v1/reservations";
describe("Reservations", () => {
  describe("GET /reservations --> returns array of reservations ", () => {
    test("should return 401 if session is expired or invalid", async () => {
      const response = await request(app)
        .get(BASE_URL)
        .set("Authorization", "");
      expect(response.status).toEqual(401);
    });
    test("should retrun an object containing status and array of reservations", async () => {
      return request(app)
        .get(BASE_URL)
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU4MDZiNGI2ZDBiNTZhNjVhNDAxODciLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTY2Njg0MTczNywiZXhwIjoxNjY2OTI4MTM3fQ.wASyDobWxAzpz9QgK0NvInf8uDfA7uptYDfD9_Bfs8M"
        )
        .expect(200)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body).toEqual(
            expect.objectContaining({
              status: expect.any(String),
              data: expect.arrayContaining([
                expect.objectContaining({
                  _id: expect.any(String),
                  uuid: expect.any(String),
                  passengerName: expect.any(String),
                  email: expect.any(String),
                  phoneNumber: expect.any(String),
                  airline: expect.any(Object),
                  travelDate: expect.any(String),
                  travelTime: expect.any(String),
                  numberOfAdults: expect.any(Number),
                  numberOfInfants: expect.any(Number),
                  fromLocation: expect.any(Object),
                  toLocation: expect.any(Object),
                  boat: expect.any(Object),
                  status: expect.any(String),
                  qrCode: expect.any(String),
                  paymentMethod: expect.any(String),
                  paymentStatus: expect.any(String),
                  total: expect.any(Number),
                  discountPercentage: expect.any(Number),
                  discountTotal: expect.any(Number),
                  couponCode: expect.any(String),
                  grandTotal: expect.any(Number),
                  reservationDate: expect.any(String),
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String),
                  __v: expect.any(Number),
                }),
              ]),
            })
          );
        });
    });
  });
  describe("GET /reservations/:id --> returns single reservation ", () => {
    describe("when reservation id is provided and valid", () => {
      test("should retrun an object containing 'status' and 'data'", async () => {
        return request(app)
          .get(BASE_URL + "/634592d5a4063fb130d41bcc")
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(
              expect.objectContaining({
                status: expect.any(String),
                data: expect.objectContaining({
                  _id: expect.any(String),
                  uuid: expect.any(String),
                  passengerName: expect.any(String),
                  email: expect.any(String),
                  phoneNumber: expect.any(String),
                  airline: expect.any(Object),
                  travelDate: expect.any(String),
                  travelTime: expect.any(String),
                  numberOfAdults: expect.any(Number),
                  numberOfInfants: expect.any(Number),
                  fromLocation: expect.any(Object),
                  toLocation: expect.any(Object),
                  boat: expect.any(Object),
                  status: expect.any(String),
                  qrCode: expect.any(String),
                  paymentMethod: expect.any(String),
                  paymentStatus: expect.any(String),
                  total: expect.any(Number),
                  discountPercentage: expect.any(Number),
                  discountTotal: expect.any(Number),
                  couponCode: expect.any(String),
                  grandTotal: expect.any(Number),
                  reservationDate: expect.any(String),
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String),
                  __v: expect.any(Number),
                }),
              })
            );
          });
      });
      // test("should return a status code of 200", async () => {})
      //test("should return content-type JSON", async () => {})
    });
    describe("when reservation id is not a valid mongodb ID", () => {
      test("should return a 400", async () => {
        return request(app)
          .get(`${BASE_URL}/232424242`)
          .then((response) => {
            expect(response.status).toEqual(400);
          });
      });
    });
    describe("when reservation is not found", () => {
      test("should return a 404", async () => {
        return request(app)
          .get(`${BASE_URL}/633d434641faab43e7c82875`)
          .then((response) => {
            expect(response.status).toEqual(404);
          });
      });
    });
  });
  describe("POST /reservations ", () => {
    describe("When Reservation details are provided", () => {
      //test("should return 400 if validation fails", async () => {})
      //test("should save to database",async () => {})
      //test("should respond with a status of 200",async () => {})
      //test("respond with a json object containing reservation details",aysnc () => {})
      //test("should respond with a content-type = json",async() => {})
    });

    describe("When Reservation details are not provided", () => {
      //test("should respond with status 400",async () => {})
    });
  });
});
