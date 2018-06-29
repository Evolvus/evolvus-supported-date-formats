const mongoose = require("mongoose");
const validator = require("validator");


var supportedDateFormatsSchema = new mongoose.Schema({
  // Add all attributes below tenantId
  tenantId: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 64
  },
  formatCode: {
    type: String,
    unique: true,
    minLength: 1,
    maxLength: 50,
    required: true
  },
  timeFormat: {
    type: String,
    minLength: 1,
    maxLength: 50
  },
  description: {
    type: String,
    minLength: 1,
    maxLength: 100
  },
  createdDate: {
    type: String,
    format: Date
  },
  lastUpdatedDate: {
    type: String,
    format: Date
  },
  createdBy: {
    type: String,
    minLength: 1,
    maxLength: 100
  },
  updatedBy: {
    type: String,
    minLength: 1,
    maxLength: 100
  },
  objVersion: {
    type: Number
  },
  enabledFlag: {
    type: String,
    enum: ["0", "1"],
    default: "1"
  }
});

module.exports = supportedDateFormatsSchema;