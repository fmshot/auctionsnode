const mongoose = require('mongoose');

var Timing = mongoose.model('Timing', {
    timee: { type: String },
    
   });

   module.exports = { Timing };