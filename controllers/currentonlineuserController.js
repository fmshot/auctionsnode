var mailjet = require ('node-mailjet')
    .connect('e74159dfb70877ff46d83c0b832d70b0', 'f5014e26e4fee1e054dc0d402fc5fb3f')
const express = require('express');
const mailer = require('../services/mailer');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Currentonlineuser }  = require('../models/currentonlineuser');
var { Registration }  = require('../models/registration');

// => localhost:3000/adminproducts/
router.get('/', (req, res) => {
    Currentonlineuser.find((err, docs) => {
    if (!err) { res.send(docs); }
else { console.log('Error in Retriving Details :' + JSON.stringify(err, undefined, 2)); }
});
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
return res.status(400).send(`No record with given id : ${req.params.id}`);

Currentonlineuser.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
else { console.log('Error in Retriving Current Online User :' + JSON.stringify(err, undefined, 2)); }
});
});

router.post('/', (req, res) => {
    console.log('request recieved', req);
// var cou = new Currentonlineuser({
//     // Date: req.body.date,
    // email: req.body.email,
    // password: req.body.password,
//     status: '1'
//     // finalamountbidded: req.body.finalamountbidded,
//     // Amount: req.body.Amount
// });
var cou = Registration.findOne({email: req.body.email}, function(err, doc) {
    if (!err && doc.password === req.body.password) {
    //     const mailer = {
    //     SEND_MAIL (sendTo, message) {
    //         var request = mailjet
    //         .post("send")
    //         .request({
    //             "FromEmail":"femishotolaa@gmail.com",
    //             "FromName":"Mailjet Pilot",
    //             "Subject":"Your email flight plan!",
    //             "Text-part":"Dear passenger, welcome to Mailjet! May the delivery force be with you!",
    //             // "Html-part":"<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!",
    //             "Recipients":[
    //                     {
    //                             "Email": sendTo
    //                             // "fmshot@yahoo.com"
    //                     }
    //             ]
    //         });
    //     request
    //             .then(result => {
    //                 console.log(result.body)
    //             })
    //             .catch(err => {
    //                 console.log(err.statusCode)
    //             })
    //         // .on('success', function (response, body) {
    //         //     console.log (response.statusCode, body);
    //         // })
    //         // .on('error', function (err, response) {
    //         //     console.log (response.statusCode, err);
    //         // });
    //     }
    // }
    //     mailer.SEND_MAIL('ololade.obadeyi@yahoo.com', 'cvhgfgiuikikikkkk');
        
    res.send(doc);
}

});
});


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
return res.status(400).send(`No records with given id : ${req.params.id}`);

Currentonlineuser.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true}, (err, doc) => {
    if (!err) {
     res.status(200).send({message: 'Record updated successfully', data: doc, statusCode: 200});
}
else { console.log('Error in Current Online User Update :' + JSON.stringify(err, undefined, 2)); }
})
});



router.put('/toggle/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
    return res.status(400).send(`No record with given id : ${req.params.id}`);
}
Currentonlineuser.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true}, (err, doc) => {
    if (!err) {
    res.status(200).send({message: 'Record updated successfully', data: doc, statusCode: 200});
}
else { console.log('Error in Current Online User Update :' + JSON.stringify(err, undefined, 2)); }
});})


router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
return res.status(400).send(`No record with given id : ${req.params.id}`);

Currentonlineuser.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
else { console.log('Error in Current Online User Delete :' + JSON.stringify(err, undefined, 2)); }
});
});

module.exports = router;