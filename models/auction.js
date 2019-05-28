const mongoose = require('mongoose');

var Auction = mongoose.model('Auction', {
    time: { type: Number },
    startDateAndTime: { type: String },
    userId: { type: String},
    auctionProductId: { type: String },
    auctionStartAmount: { type: String },
    productObject: { type: String },
    startAuction: { type: Number },
    todayy:{ String },
    auctionTimer:{ String },
    paid:{ type: Number },
   });

   module.exports = { Auction };