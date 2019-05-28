const mongoose = require('mongoose');

var Registration = mongoose.model('Registration', {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
    phonenumber: { type: Number },
    status: { type: Number },
    onlinestatus: { type: Number},
   });

   module.exports = { Registration };