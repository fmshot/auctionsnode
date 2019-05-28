const mongoose = require('mongoose');

var Aucttime = mongoose.model('Auctime', {
    thetime: { type: String }
    });

   module.exports = { Aucttime };