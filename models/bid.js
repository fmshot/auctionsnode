const mongoose = require('mongoose');

var Bid = mongoose.model('Bid', {
    userid: { type: String },
    auctionid: { type: String },
    finalbid: { type: Number },
    userObject: { type: String },
    // biddate: { type: String },
    bidtime: { type: String },
    time: { type: Number },
    status: { type: Number },
    onlinestatus: { type: Number },
   });

   module.exports = { Bid };