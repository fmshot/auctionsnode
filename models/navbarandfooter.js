const mongoose = require('mongoose');

var Navbarandfooter = mongoose.model('Navbarandfooter', {
aboutus: { type: String },
contactus: { type: String },
upcomingauction: { type: String },
currentproductonauction: { type: String },
});
module.exports = { Navbarandfooter };