const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Adminproduct }  = require('../models/adminproduct');

// => localhost:3000/adminproducts/
router.get('/', (req, res) => {
    Adminproduct.find((err, docs) => {
    if (!err) { res.send(docs); }
else { console.log('Error in Retriving Details :' + JSON.stringify(err, undefined, 2)); }
});
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
return res.status(400).send(`No record with given id : ${req.params.id}`);

Adminproduct.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
else { console.log('Error in Retriving Registration :' + JSON.stringify(err, undefined, 2)); }
});
});

router.post('/', (req, res) => {
    console.log('request recieved', req);
var admprd = new Adminproduct({
    // Date: req.body.date,
    productname: req.body.productname,
    productcode: req.body.productcode,
    minauctionprice: req.body.minauctionprice,
    description: req.body.description,
    productimage: req.body.productimage,
    auctiondate: req.body.auctiondate,
    auctiontime: req.body.auctiontime,
    status: '0',
    // date: new Date()
    // finalamountbidded: req.body.finalamountbidded,
    // Amount: req.body.Amount
});
admprd.save((err, doc) => {
    if (!err) { res.send(doc); }
else { console.log('Error in adminproduct save :' + JSON.stringify(err, undefined, 2)); }
});
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
return res.status(400).send(`No records with given id : ${req.params.id}`);

Adminproduct.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true}, (err, doc) => {
    if (!err) {
     res.status(200).send({message: 'Record updated successfully', data: doc, statusCode: 200});
}
else { console.log('Error in Admin Products Update :' + JSON.stringify(err, undefined, 2)); }
})
});


router.put('/toggle/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
    return res.status(400).send(`No record with given id : ${req.params.id}`);
}
Adminproduct.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true}, (err, doc) => {
    if (!err) {
    res.status(200).send({message: 'Record updated successfully', data: doc, statusCode: 200});
}
else { console.log('Error in Admin Products Update :' + JSON.stringify(err, undefined, 2)); }
});})



router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
return res.status(400).send(`No record with given id : ${req.params.id}`);

Adminproduct.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
else { console.log('Error in Admin Products Delete :' + JSON.stringify(err, undefined, 2)); }
});
});

module.exports = router;