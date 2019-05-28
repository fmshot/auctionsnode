const express = require('express');
const mailer = require('../services/mailer')
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Aucttime }  = require('../models/aucttime');

// => localhost:3000/aucttimes/
router.get('/', (req, res) => {
    Aucttime.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Details :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Registration.findById(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Retriving Registration :' + JSON.stringify(err, undefined, 2)); }
        });
});

 router.post('/', (req, res) => {
     console.log('request recieved', req);
     var au = new Aucttime ({
     thetime: req.body.thetime,
     });
    au.save((err, doc) => {
        if (!err) { 
            res.send(doc); }
        else { console.log('Error in Aucttime save :' + JSON.stringify(err, undefined, 2)); }
    });
 });

 
 router.post('/dump', (req, res) => {
     return req;
    console.log('request recieved', req);
    
   
});

 router.put('/:id', (req, res) => {
     if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id : ${req.params.id}`);

        var reg = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: '123456',
            phonenumber: req.body.phonenumber,
            status: '0'

        };
        Registration.findByIdAndUpdate(req.params.id, { $set: reg }, { new: true}, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Registration Update :' + JSON.stringify(err, undefined, 2)); }
        });
 });



 router.put('/toggle/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
    return res.status(400).send(`No record with given id : ${req.params.id}`);
}
Registration.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true}, (err, doc) => {
    if (!err) {
    res.status(200).send({message: 'Record updated successfully', data: doc, statusCode: 200});
}
else { console.log('Error in User Status Update :' + JSON.stringify(err, undefined, 2)); }
});})



 
 router.delete('/:id', (req, res) => {
     if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Registration.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Registration Delete :' + JSON.stringify(err, undefined, 2)); }
        });
 });
 
module.exports = router;