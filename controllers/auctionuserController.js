const express = require('express');
const mailer = require('../services/mailer')
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Auctionuser }  = require('../models/auctionuser');
var { Adminproduct } = require('../models/adminproduct');
var { Auction }  = require('../models/auction');

// => localhost:3000/auctionusers/
router.get('/', (req, res) => {
    Auctionuser.find((err, docs) => {
        if (!err) 
        { res.send(docs);
         }else { console.log('Error in Retriving Details :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Auctionuser.findById(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Retriving Auctionuser :' + JSON.stringify(err, undefined, 2)); }
        });
});

 router.post('/', (req, res) => {
    //  console.log('auctionproducts recieved', req.body.auctionproduct);
    //  var auid=JSON.stringify(req.body.auctionid);
     var auctuser = new Auctionuser ({
     useremail: req.body.useremail,
     auctionproduct: req.body.auctionproduct,
     });
    auctuser.save((err, doc) => {
        if (!err) { 
            res.send(doc); 
         console.log('auctionproducts recieved', req.body.auctionproduct);}
        else { console.log('Error in Auctionuser save :' + JSON.stringify(err, undefined, 2)); }
    });
 });

 
 router.post('/dump', (req, res) => {
     return req;
    console.log('request recieved', req);
    
   
});

 router.put('/:id', (req, res) => {
     if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id : ${req.params.id}`);

        var auctuser = {
            userid: req.body.userid,
            auctionid: req.body.auctionid,
       };
       Auctionuser.findByIdAndUpdate(req.params.id, { $set: auctuser }, { new: true}, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Auctionuser Update :' + JSON.stringify(err, undefined, 2)); }
        });
 });



 router.put('/toggle/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
    return res.status(400).send(`No record with given id : ${req.params.id}`);
}
Auctionuser.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true}, (err, doc) => {
    if (!err) {
    res.status(200).send({message: 'Record updated successfully', data: doc, statusCode: 200});
}
else { console.log('Error in User Status Update :' + JSON.stringify(err, undefined, 2)); }
});})



 
 router.delete('/:id', (req, res) => {
     if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Auctionuser.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Registration Delete :' + JSON.stringify(err, undefined, 2)); }
        });
 });
 
module.exports = router;