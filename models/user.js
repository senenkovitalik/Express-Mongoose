var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: { type: String, unique: true }
});

module.exports = mongoose.model('User', userSchema);
