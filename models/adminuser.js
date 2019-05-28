const mongoose = require('mongoose');

var Adminuser = mongoose.model('Adminuser', {
    Date: { type: Number },
    OrderID: { type: Number },
    Name: { type: String },
    Price: { type: Number },
    Quantity: { type: Number },
    Amount: { type: Number }

});

module.exports = { Adminuser } ;