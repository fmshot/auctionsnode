const express = require('express');
const bodyParser = require('body-parser');
const Mailjet = require('node-mailjet').connect('api key', 'api secret');
const Pusher = require('pusher');
const cors = require('cors');
require('dotenv').config();
const shortId = require('shortid');

const {
  mongoose
} = require('./db.js');
var registrationController = require('./controllers/registrationController.js');
var adminproductController = require('./controllers/adminproductController.js');
var currentonlineuserController = require('./controllers/currentonlineuserController.js');
var navbarandfooterController = require('./controllers/navbarandfooterController.js');
var bidController = require('./controllers/bidController.js');
var auctionController = require('./controllers/auctionController.js');
var auctionuserController = require('./controllers/auctionuserController.js');
// var aucttimeController = require('./controllers/aucttimeController.js');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors({
  origin: 'http://localhost:4200'
}));

// const pusher = new Pusher({
//     appId: process.env.Pusher_App_ID,
//     key: process.env.Pusher_App_KEY,
//     secret: process.env.Pusher_App_SECRET,
//     cluster: 'eu',
//     encrypted: true
// })

const pusher = new Pusher({
  appId: '642022',
  key: 'ee883b757f50aa4ab7b0',
  secret: '7c379689ae019bc3ccfa',
  cluster: 'us2',
  encrypted: true
});


app.post('/message', async (req, res) => {
  // simulate actual db save with id and createdAt added
  const chat = {
    ...req.body,
    id: shortId.generate(),
    createdAt: new Date().toISOString()
  }
  // trigger this update to our pushers listeners
  // pusher.trigger('chat-group', 'chat', chat)
  res.send(chat)
});

app.post('/join', (req, res) => {
  const chat = {
    ...req.body,
    id: shortId.generate(),
    type: 'joined',
    createdAt: new Date().toISOString()
  }
  // trigger this update to our pushers listeners
  // pusher.trigger('my-channel', 'my-event', {"message": "hello world"});
  pusher.trigger('chat-group', 'chat', chat)
  res.send(chat)
});



app.listen(process.env.PORTs || 3000, () => console.log('Server started at port : 3000'));

app.use('/registrations', registrationController);
app.use('/adminproducts', adminproductController);
app.use('/currentonlineusers', currentonlineuserController);
app.use('/navbarandfooters', navbarandfooterController);
app.use('/bids', bidController);
app.use('/auctions', auctionController);
app.use('/auctionusers', auctionuserController);
// app.use('/aucttimes', aucttimeController);