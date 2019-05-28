const mongoose = require('mongoose');

var Adminproduct = mongoose.model('Adminproduct', {
    // Date: { type: Number },
    productname: { type: String },
    productcode: { type: String },
    minauctionprice: { type: String},
    description: { type: String},
    productimage: { type: String},
    auctiondate: { type: String},
    auctiontime: { type: String},
    status: { type: Number},
    onlinestatus: { type: Number},

    // finalamountbidded: { type: String },
    // Amount: { type: Number }

});

module.exports = { Adminproduct } ;