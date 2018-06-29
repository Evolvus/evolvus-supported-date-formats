/*
 ** JSON Schema representation of the supportedDateFormats model
 */
module.exports.schema = {
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "supportedDateFormatsModel",
  "type": "object",
  "properties": {
    "tenantId": {
      "type": "string",
      "minLength": 1,
      "maxLength": 64
    },
    "formatCode": {
      "type": "string",
      "unique": true,
      "minLength": 1,
      "maxLength": 50
    },
    "timeFormat": {
      "type": "string",
      "minLength": 1,
      "maxLength": 50
    },
    "description": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "createdDate": {
      "type": "string",
      "format": "date-time"
    },
    "lastUpdatedDate": {
      "type": "string",
      "format": "date-time"
    },
    "createdBy": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "updatedBy": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "objVersion": {
      "type": "number"
    },
    "enabledFlag": {
      "type": "string",
      "default": "1",
      "enum": ["0", "1"]
    }
  },
  "required": ["tenantId", "formatCode"]
};