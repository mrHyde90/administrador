const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  matricula: {type: String, required: true},
  carrera: {type: String, required: true},
  name: {type: String, required: true},
  user_type: {type: String, enum: ["Normal", "Admin"], default: "Normal"}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);