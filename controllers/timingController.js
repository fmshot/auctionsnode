const express = require('express');
const mailer = require('../services/mailer')
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Timing }  = require('../models/timing');



router.post('/', (req, res) => {
    console.log('request recieved', req);
    var tim = new Timing ({
        timee: req.body. timee,
    

   });
   tim.save((err, doc) => {
       if (!err) { 
           res.send(doc); }
       else { console.log('Error in Timing save :' + JSON.stringify(err, undefined, 2)); }
   });
});


router.get('/', (req, res) => {
    Timing.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Details :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;