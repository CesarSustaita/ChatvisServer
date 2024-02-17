var mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  nombre: {type: String},
  apellido_paterno: {type: String},
  apellido_materno: {type: String},
  estado: {type: String},
  ciudad: {type: String},
  universidad: {type: String},
  password: {type: String, required: true,},
  email: {type: String, required: true,},
  admin: {type: Number, default: 0,},
  num_uso: {type: Number, default: 0,},
});

module.exports = mongoose.model("User", UserSchema);
