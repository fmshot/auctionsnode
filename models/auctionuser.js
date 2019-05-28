const mongoose = require('mongoose');

var Auctionuser = mongoose.model('Auctionuser', {
    useremail: { type: String },
    auctionproduct: { type: String },
   });

   module.exports = { Auctionuser };