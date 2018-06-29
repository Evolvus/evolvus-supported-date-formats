const debug = require("debug")("evolvus-supported-date-formats:index");
const supportedDateFormatsSchema = require("./model/supportedDateFormatsSchema")
  .schema;
const supportedDateFormatsCollection = require("./db/supportedDateFormats");
const validate = require("jsonschema")
  .validate;
const docketClient=require("evolvus-docket-client");

var docketObject={
  // required fields
  application:"PLATFORM",
  source:"supportedDateFormats",
  name:"",
  createdBy:"",
  ipAddress:"",
  status:"SUCCESS", //by default
  eventDateTime:Date.now(),
  keyDataAsJSON:"",
  details:"",
  //non required fields
  level:""
};

module.exports.validate = (supportedDateFormatsObject) => {
  return new Promise((resolve, reject) => {
    try {
      if(typeof supportedDateFormatsObject==="undefined" ) {
        throw new Error("IllegalArgumentException:supportedDateFormatsObject is undefined");
      }
      var res = validate(supportedDateFormatsObject, supportedDateFormatsSchema);
      debug("validation status: ", JSON.stringify(res));
      if(res.valid) {
        resolve(res.valid);
      } else {
        reject(res.errors);
      }
    } catch (err) {
      reject(err);
    }
  });
};

// All validations must be performed before we save the object here
// Once the db layer is called its is assumed the object is valid.
module.exports.save = (supportedDateFormatsObject) => {
  return new Promise((resolve, reject) => {
    try {
      if(typeof supportedDateFormatsObject === 'undefined' || supportedDateFormatsObject == null) {
         throw new Error("IllegalArgumentException: supportedDateFormatsObject is null or undefined");
      }
      docketObject.name="supportedDateFormats_save";
      docketObject.keyDataAsJSON=JSON.stringify(supportedDateFormatsObject);
      docketObject.details=`supportedDateFormats creation initiated`;
      docketClient.postToDocket(docketObject);
      var res = validate(supportedDateFormatsObject, supportedDateFormatsSchema);
      debug("validation status: ", JSON.stringify(res));
      if(!res.valid) {
        reject(res.errors);
      }

      // Other validations here


      // if the object is valid, save the object to the database
      supportedDateFormatsCollection.save(supportedDateFormatsObject).then((result) => {
        debug(`saved successfully ${result}`);
        resolve(result);
      }).catch((e) => {
        debug(`failed to save with an error: ${e}`);
        reject(e);
      });
    } catch (e) {
      docketObject.name="supportedDateFormats_ExceptionOnSave";
      docketObject.keyDataAsJSON=JSON.stringify(supportedDateFormatsObject);
      docketObject.details=`caught Exception on supportedDateFormats_save ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

// List all the objects in the database
// makes sense to return on a limited number
// (what if there are 1000000 records in the collection)
module.exports.getAll = (limit) => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof(limit) == "undefined" || limit == null) {
        throw new Error("IllegalArgumentException: limit is null or undefined");
      }
      docketObject.name="supportedDateFormats_getAll";
      docketObject.keyDataAsJSON=`getAll with limit ${limit}`;
      docketObject.details=`supportedDateFormats getAll method`;
      docketClient.postToDocket(docketObject);

      supportedDateFormatsCollection.findAll(limit).then((docs) => {
        debug(`supportedDateFormats(s) stored in the database are ${docs}`);
        resolve(docs);
      }).catch((e) => {
        debug(`failed to find all the supported-date-formats(s) ${e}`);
        reject(e);
      });
    } catch (e) {
      docketObject.name="supportedDateFormats_ExceptionOngetAll";
      docketObject.keyDataAsJSON="supportedDateFormatsObject";
      docketObject.details=`caught Exception on supportedDateFormats_getAll ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};


// Get the entity idenfied by the id parameter
module.exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    try {

      if (typeof(id) == "undefined" || id == null) {
        throw new Error("IllegalArgumentException: id is null or undefined");
      }
      docketObject.name="supportedDateFormats_getById";
      docketObject.keyDataAsJSON=`supportedDateFormatsObject id is ${id}`;
      docketObject.details=`supportedDateFormats getById initiated`;
      docketClient.postToDocket(docketObject);

      supportedDateFormatsCollection.findById(id)
        .then((res) => {
          if (res) {
            debug(`supportedDateFormats found by id ${id} is ${res}`);
            resolve(res);
          } else {
            // return empty object in place of null
            debug(`no supportedDateFormats found by this id ${id}`);
            resolve({});
          }
        }).catch((e) => {
          debug(`failed to find supportedDateFormats ${e}`);
          reject(e);
        });

    } catch (e) {
      docketObject.name="supportedDateFormats_ExceptionOngetById";
      docketObject.keyDataAsJSON=`supportedDateFormatsObject id is ${id}`;
      docketObject.details=`caught Exception on supportedDateFormats_getById ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

module.exports.getOne=(attribute,value)=> {
  return new Promise((resolve,reject)=> {
    try {
      if (attribute == null || value == null || typeof attribute === 'undefined' || typeof value === 'undefined') {
        throw new Error("IllegalArgumentException: attribute/value is null or undefined");
      }

      docketObject.name="supportedDateFormats_getOne";
      docketObject.keyDataAsJSON=`supportedDateFormatsObject ${attribute} with value ${value}`;
      docketObject.details=`supportedDateFormats getOne initiated`;
      docketClient.postToDocket(docketObject);
      supportedDateFormatsCollection.findOne(attribute,value).then((data)=> {
        if (data) {
          debug(`supportedDateFormats found ${data}`);
          resolve(data);
        } else {
          // return empty object in place of null
          debug(`no supportedDateFormats found by this ${attribute} ${value}`);
          resolve({});
        }
      }).catch((e)=> {
        debug(`failed to find ${e}`);
      });
    } catch (e) {
      docketObject.name="supportedDateFormats_ExceptionOngetOne";
      docketObject.keyDataAsJSON=`supportedDateFormatsObject ${attribute} with value ${value}`;
      docketObject.details=`caught Exception on supportedDateFormats_getOne ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

module.exports.getMany=(attribute,value)=> {
  return new Promise((resolve,reject)=> {
    try {
      if (attribute == null || value == null || typeof attribute === 'undefined' || typeof value === 'undefined') {
        throw new Error("IllegalArgumentException: attribute/value is null or undefined");
      }

      docketObject.name="supportedDateFormats_getMany";
      docketObject.keyDataAsJSON=`supportedDateFormatsObject ${attribute} with value ${value}`;
      docketObject.details=`supportedDateFormats getMany initiated`;
      docketClient.postToDocket(docketObject);
      supportedDateFormatsCollection.findMany(attribute,value).then((data)=> {
        if (data) {
          debug(`supportedDateFormats found ${data}`);
          resolve(data);
        } else {
          // return empty object in place of null
          debug(`no supportedDateFormats found by this ${attribute} ${value}`);
          resolve([]);
        }
      }).catch((e)=> {
        debug(`failed to find ${e}`);
      });
    } catch (e) {
      docketObject.name="supportedDateFormats_ExceptionOngetMany";
      docketObject.keyDataAsJSON=`supportedDateFormatsObject ${attribute} with value ${value}`;
      docketObject.details=`caught Exception on supportedDateFormats_getMany ${e.message}`;
      docketClient.postToDocket(docketObject);
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};
