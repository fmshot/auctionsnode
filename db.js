const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/AuctionsDB', (err) => {
//     if (!err)
//         console.log('MongoDB connection succeeded..');
//     else
//         console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
// });


mongoose.connect('mongodb+srv://fmshot:nazareneadebayo1@auctionsng-k6ges.mongodb.net/test?retryWrites=true&w=majority', (err) => {
    if (!err)
        console.log('MongoDB connection succeeded..');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

mongoose.exports = mongoose;