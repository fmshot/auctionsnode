const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const  Navbarandfooter   = require('../models/navbarandfooter');

// => localhost:3000/Navbarandfooters/
router.get('/', (req, res) => {
    Navbarandfooter.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Details :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Navbarandfooter.findById(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Retriving Navbarandfooter :' + JSON.stringify(err, undefined, 2)); }
        });
});

 router.post('/', (req, res) => {
     console.log('request recieved', req);
     var naf = new Navbarandfooter ({
     aboutus: req.body.aboutus,
     contactus: req.body.contactus,
     upcomingauction: req.body.upcomingauction,
     currentproductonauction: req.body.currentproductonauction,
    //  phonenumber: req.body.phonenumber,
    //  status: '0'
    });
    naf.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Navbarandfooter save :' + JSON.stringify(err, undefined, 2)); }
    });
 });

 router.put('/:id', (req, res) => {
     if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id : ${req.params.id}`);

        var naf = {
            aboutus: req.body.aboutus,
            contactus: req.body.contactus,
            upcomingauction: req.body.up,
            currentproductonauction: req.body.currentproductonauction
            // phonenumber: req.body.phonenumber
        };
        Navbarandfooter.findByIdAndUpdate(req.params.id, { $set: reg }, { new: true}, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Navbarandfooter Update :' + JSON.stringify(err, undefined, 2)); }
        });
 });
 router.delete('/:id', (req, res) => {
     if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Navbarandfooter.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Navbarandfooter Delete :' + JSON.stringify(err, undefined, 2)); }
        });
 });
 
module.exports = router;