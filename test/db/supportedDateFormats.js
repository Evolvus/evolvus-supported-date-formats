const debug = require("debug")("evolvus-supported-date-formats.test.db.supportedDateFormats");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const supportedDateFormats = require("../../db/supportedDateFormats");

var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://10.10.69.204/TestPlatform_Dev";

chai.use(chaiAsPromised);

// High level wrapper
// Testing db/supportedDateFormats.js
describe("db supportedDateFormats testing", () => {
  /*
   ** Before doing any tests, first get the connection.
   */
  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
      debug("ok got the connection");
      done();
    });
  });

  let object1 = {
    // add a valid supportedDateFormats object
    "tenantId": "tenobj",
    "formatCode": "format1",
    "timeFormat": "time",
    "description": "this is first",
    "createdDate": new Date().toISOString(),
    "lastUpdatedDate": new Date().toISOString(),
    "createdBy": "SYSTEM",
    "updatedBy": "SYSTEM",
    "objVersion": 123,
    "enabledFlag": "1"

  };
  let object2 = {
    // add a valid supportedDateFormats object
    "tenantId": "tenobjtwo",
    "formatCode": "formattwo",
    "timeFormat": "timetwo",
    "description": "this is two",
    "createdDate": new Date().toISOString(),
    "lastUpdatedDate": new Date().toISOString(),
    "createdBy": "SYSTEM",
    "updatedBy": "SYSTEM",
    "objVersion": 123,
    "enabledFlag": "1"
  };

  describe("testing supportedDateFormats.save", () => {
    // Testing save
    // 1. Valid supportedDateFormats should be saved.
    // 2. Non supportedDateFormats object should not be saved.
    // 3. Should not save same supportedDateFormats twice.
    beforeEach((done) => {
      supportedDateFormats.deleteAll()
        .then((data) => {
          done();
        });
    });

    it("should save valid supportedDateFormats to database", (done) => {
      let testsupportedDateFormatsCollection = {
        // add a valid supportedDateFormats object
        "tenantId": "tenobjsupport",
        "formatCode": "formatsupport",
        "timeFormat": "timesupport",
        "description": "this is support",
        "createdDate": new Date().toISOString(),
        "lastUpdatedDate": new Date().toISOString(),
        "createdBy": "SYSTEM",
        "updatedBy": "SYSTEM",
        "objVersion": 123,
        "enabledFlag": "1"
      };
      let res = supportedDateFormats.save(testsupportedDateFormatsCollection);
      expect(res)
        .to.eventually.include(testsupportedDateFormatsCollection)
        .notify(done);
    });

    it("should fail saving invalid object to database", (done) => {
      // not even a  object

      let invalidObject = {
        // add a invalid supportedDateFormats object
        "lastUpdatedDate": new Date().toISOString(),
        "createdBy": "SYSTEM",
        "updatedBy": "SYSTEM",
        "objVersion": 123,
        "enabledFlag": "1"
      };
      let res = supportedDateFormats.save(invalidObject);
      expect(res)
        .to.be.eventually.rejectedWith("supportedDateFormatsCollection validation failed")
        .notify(done);
    });
  });

  describe("testing supportedDateFormats.findAll by limit", () => {
    // 1. Delete all records in the table and insert
    //    4 new records.
    // find -should return an array of size equal to value of limit with the
    // roleMenuItemMaps.
    // Caveat - the order of the roleMenuItemMaps fetched is indeterminate

    // delete all records and insert four roleMenuItemMaps
    let object3 = {
      // add a valid supportedDateFormats object
      "tenantId": "tenthrees",
      "formatCode": "formatthrees",
      "timeFormat": "timethrees",
      "description": "this is threes",
      "createdDate": new Date().toISOString(),
      "lastUpdatedDate": new Date().toISOString(),
      "createdBy": "SYSTEM",
      "updatedBy": "SYSTEM",
      "objVersion": 123,
      "enabledFlag": "1"

    };
    let object4 = {
      // add a valid supportedDateFormats object
      "tenantId": "tenobjfour",
      "formatCode": "formajfour",
      "timeFormat": "timejfour",
      "description": "this is jfour",
      "createdDate": new Date().toISOString(),
      "lastUpdatedDate": new Date().toISOString(),
      "createdBy": "SYSTEM",
      "updatedBy": "SYSTEM",
      "objVersion": 123,
      "enabledFlag": "1"
    };


    beforeEach((done) => {
      supportedDateFormats.deleteAll().then(() => {
        supportedDateFormats.save(object1).then((res) => {
          supportedDateFormats.save(object2).then((res) => {
            supportedDateFormats.save(object3).then((res) => {
              supportedDateFormats.save(object4).then((res) => {
                done();
              });
            });
          });
        });
      });
    });

    it("should return limited number of records", (done) => {
      let res = supportedDateFormats.findAll(3);
      expect(res)
        .to.be.fulfilled.then((docs) => {
          expect(docs)
            .to.be.a('array');
          expect(docs.length)
            .to.equal(3);
          expect(docs[0])
            .to.include(object1);
          done();
        }, (err) => {
          done(err);
        })
        .catch((e) => {
          done(e);
        });
    });

    it("should return all records if value of limit parameter is less than 1 i.e, 0 or -1", (done) => {
      let res = supportedDateFormats.findAll(-1);
      expect(res)
        .to.be.fulfilled.then((docs) => {
          expect(docs)
            .to.be.a('array');
          expect(docs.length)
            .to.equal(4);
          expect(docs[0])
            .to.include(object1);
          done();
        }, (err) => {
          done(err);
        })
        .catch((e) => {
          done(e);
        });
    });
  });

  // describe("testing roleMenuItemMap.find without data", () => {
  //   // delete all records
  //   // find should return empty array
  //   beforeEach((done) => {
  //     supportedDateFormats.deleteAll()
  //       .then((res) => {
  //         done();
  //       });
  //   });
  //
  //   it("should return empty array i.e. []", (done) => {
  //     let res = supportedDateFormats.findAll(2);
  //     expect(res)
  //       .to.be.fulfilled.then((docs) => {
  //         expect(docs)
  //           .to.be.a('array');
  //         expect(docs.length)
  //           .to.equal(0);
  //         expect(docs)
  //           .to.eql([]);
  //         done();
  //       }, (err) => {
  //         done(err);
  //       })
  //       .catch((e) => {
  //         done(e);
  //       });
  //   });
  // });
  //
  // describe("testing supportedDateFormats.findById", () => {
  //   // Delete all records, insert one record , get its id
  //   // 1. Query by this id and it should return one supportedDateFormats
  //   // 2. Query by an arbitrary id and it should return {}
  //   // 3. Query with null id and it should throw IllegalArgumentException
  //   // 4. Query with undefined and it should throw IllegalArgumentException
  //   // 5. Query with arbitrary object
  //   let testObject = {
  //     //add a valid supportedDateFormats object
  //
  //   };
  //   var id;
  //   beforeEach((done) => {
  //     supportedDateFormats.deleteAll()
  //       .then((res) => {
  //         supportedDateFormats.save(testObject)
  //           .then((savedObj) => {
  //             id = savedObj._id;
  //             done();
  //           });
  //       });
  //   });
  //
  //   it("should return supportedDateFormats identified by Id ", (done) => {
  //     let res = supportedDateFormats.findById(id);
  //     expect(res)
  //       .to.eventually.include(testObject)
  //       .notify(done);
  //   });
  //
  //   it("should return null as no supportedDateFormats is identified by this Id ", (done) => {
  //     let badId = new mongoose.mongo.ObjectId();
  //     let res = supportedDateFormats.findById(badId);
  //     expect(res)
  //       .to.eventually.to.eql(null)
  //       .notify(done);
  //   });
  // });
  //
  // describe("testing supportedDateFormats.findOne", () => {
  //   // Delete all records, insert two record
  //   // 1. Query by one attribute and it should return one supportedDateFormats
  //   // 2. Query by an arbitrary attribute value and it should return {}
  //
  //   // delete all records and insert two supportedDateFormatss
  //   beforeEach((done) => {
  //     supportedDateFormats.deleteAll()
  //       .then((res) => {
  //         supportedDateFormats.save(object1)
  //           .then((res) => {
  //             supportedDateFormats.save(object2)
  //               .then((savedObj) => {
  //                 done();
  //               });
  //           });
  //       });
  //   });
  //
  //   it("should return object for valid attribute value", (done) => {
  //     // take one valid attribute and its value
  //     let attributename = "";
  //     let attributeValue = "";
  //     let res = supportedDateFormats.findOne(attributename, attributeValue);
  //     expect(res)
  //       .to.eventually.include(object1)
  //       .notify(done);
  //   });
  //
  //   it("should return null as no supportedDateFormats is identified by this attribute ", (done) => {
  //     let res = supportedDateFormats.findOne(validAttribute, invalidValue);
  //     expect(res)
  //       .to.eventually.to.eql(null)
  //       .notify(done);
  //   });
  // });
  //
  // describe("testing supportedDateFormats.findMany", () => {
  //   // Delete all records, insert two record
  //   // 1. Query by one attribute and it should return all supportedDateFormatss having attribute value
  //   // 2. Query by an arbitrary attribute value and it should return {}
  //   let supportedDateFormats1 = {
  //     //add valid object
  //
  //   };
  //   let supportedDateFormats2 = {
  //     //add valid object with one attribute value same as "supportedDateFormats1"
  //
  //   };
  //   // delete all records and insert two supportedDateFormatss
  //   beforeEach((done) => {
  //     supportedDateFormats.deleteAll()
  //       .then((res) => {
  //         supportedDateFormats.save(supportedDateFormats1)
  //           .then((res) => {
  //             supportedDateFormats.save(supportedDateFormats2)
  //               .then((savedObj) => {
  //                 done();
  //               });
  //           });
  //       });
  //   });
  //
  //   it("should return array of objects for valid attribute value", (done) => {
  //     // take one valid attribute and its value
  //     let attributename = "";
  //     let attributeValue = "";
  //     let res = supportedDateFormats.findMany(attributename, attributeValue);
  //     expect(res).to.eventually.be.a("array");
  //     //enter proper length according to input attribute
  //     expect(res).to.eventually.have.length(1);
  //     done();
  //   });
  //
  //   it("should return empty array as no supportedDateFormats is identified by this attribute ", (done) => {
  //     let res = supportedDateFormats.findMany(validAttribute, invalidValue);
  //     expect(res)
  //       .to.eventually.to.eql([])
  //       .notify(done);
  //   });
  // });
});