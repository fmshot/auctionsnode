const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Bid }  = require('../models/bid');
   module.exports = { Registration };
var {Registration} = require('../models/registration');

// => localhost:3000/Bids/
router.get('/', (req, res) => {
    Bid.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Details :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Bid.findById(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Retriving Bid :' + JSON.stringify(err, undefined, 2)); }
        });
});
 






router.get('/auctions/:id', (req, res) => {
    var bids = [];
    var auctions = [];
 Bid.find((err, docs) => {
        if (!err) {
             bids = docs; 
             auctions = bids.filter(bid=>{
                 if(bid.auctionid){ return bid.auctionid.toString() == req.params.id.toString();}
            });
            res.send(auctions);
        }
        else {
            res.send(err);
            return;}
    });
});
 // db.collection.find().sort({age:-1}).limit(1)
 router.get('max/auctions/:id', (req, res) => {
    var bids = [];
    var auctions = [];
 Bid.find((err, docs)).sort({finalbid:-1}).limit(1).exec(function()  {
    if (!err) { bids = docs; 
         auctions = bids.filter(bid=>{
             if(bid.auctionid){ return bid.auctionid.toString() == req.params.id.toString();} });
        // res.send(auctions);
      res.send((docs));  } else { res.send(err);
        return;  }
}); });


  


 router.post('/', (req, res) => {
     console.log('request recieved', req);
    //  Bid.findById(req.params.id, (err, doc) => {
    //     if (!err) { res.send(doc); }
    //     else { console.log('Error in Retriving Bid :' + JSON.stringify(err, undefined, 2)); }
    // });
    //  var newUser = new User();
    //  var userObject;
    //  Registration.findById(req.body.userid, (err, doc)=>{
    //     if (!err){userObject = JSON.stringify(doc);}
    //     else{
    //         res.send(err);
    //         return;}
    //  })

     var reg = new Bid ({
     userid: req.body.userid,
     auctionid: req.body.auctionid,
     finalbid: req.body.finalbid,
     userObject:JSON.stringify(req.body.userObject),
    //  biddate: req.body.biddate,
    //  bidtime: req.body.bidtime,
    time: req.body.time,
     bidtime: new Date().getHours() + ':' + new Date().getMinutes(),
    status: '0',
     onlinestatus: '0',
     den: new Date().toISOString()
    //  onlinestatus: '0'
    });
    reg.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Bid save :' + JSON.stringify(err, undefined, 2)); }
    });
 });

 
 router.post('/dump', (req, res) => {
    console.log('request recieved', req);
    
    return req;
    
   
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
return res.status(400).send(`No records with given id : ${req.params.id}`);

Bid.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true}, (err, doc) => {
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
Bid.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true}, (err, doc) => {
    if (!err) {
    res.status(200).send({message: 'Record updated successfully', data: doc, statusCode: 200});
}
else { console.log('Error in User Status Update :' + JSON.stringify(err, undefined, 2)); }
});})


 
 router.delete('/:id', (req, res) => {
     if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Bid.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Bid Delete :' + JSON.stringify(err, undefined, 2)); }
        });
 });

 
module.exports = router;