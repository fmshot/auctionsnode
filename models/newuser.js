const mongoose = require('mongoose');

var Newuser = mongoose.model('Newuser', {
    // Date: { type: Number },
    email: { type: String },
    password: { type: String },
    phonenumber: { type: Number},
    status: { type: Number},

    // finalamountbidded: { type: String },
    // Amount: { type: Number }

});

module.exports = { Newuser } ;