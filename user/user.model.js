const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      // remove these props when object is serialized
      delete ret.id;
      delete ret._id;
      delete ret.password;
  }
});

module.exports = mongoose.model("User", schema);