const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: String
},
{
    timestamps: true
});

const userModel =  mongoose.model("userModel", userSchema);

module.exports = {userModel}