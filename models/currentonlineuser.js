const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var crypto = require('crypto');

var Currentonlineuser= mongoose.model('Currentonlineuser', {
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
    }
    })
    module.exports = { Currentonlineuser };


// hash: String,
    // salt: String

// });
//creating the password
// userSchema.methods.setPassword = function(password){
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
// };
// end creating the password

//checking the password
// userSchema.methods.validPassword = function(password) {
//     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
//     return this.hash === hash;
// };
//end checking the password






