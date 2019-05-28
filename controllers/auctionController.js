var mailjet = require('node-mailjet')
    .connect('e74159dfb70877ff46d83c0b832d70b0', 'f5014e26e4fee1e054dc0d402fc5fb3f')
const express = require('express');
const mailer = require('../services/mailer');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {
    Auction
} = require('../models/auction');
var {
    Adminproduct
} = require('../models/adminproduct');

// => localhost:3000/auctions/
router.get('/', (req, res) => {
    Auction.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving Details :' + JSON.stringify(err, undefined, 2));
        }
    });
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Auction.findById(req.params.id, (err, doc) => {
        console.log('logindetails', doc);
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Retriving Registration :' + JSON.stringify(err, undefined, 2));
        }
    });
});


router.get('/auction/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Auction.findById(req.params.id, (err, doc) => {
        if (!err) {

            const all = {
                doc,
                product: {}
            };
            Adminproduct.findById(doc.auctionProductId, (err, product) => {
                if (!err) {
                    all.product = product;
                    console.log('qwerty', all);
                } else {
                    console.log('Error in Retriving Auctions :' + JSON.stringify(err, undefined, 2));
                }
            });
            res.send(all);
            console.log('auction doc', all);
        } else {
            console.log('Error in Retriving Auctions :' + JSON.stringify(err, undefined, 2));
        }
    });

    // Product.findById(req.params.id, (err, doc) => {
    //     if (!err) { res.send(doc); }
    //     else { console.log('Error in Retriving Registration :' + JSON.stringify(err, undefined, 2)); }
    // });
});

router.post('/', (req, res) => {
    console.log('request recieved', req.body);
    var prodObject = JSON.stringify(req.body.productObject);
    var auc = new Auction({
        time: null,
        startDateAndTime: new Date(req.body.startDateAndTime),
        auctionProductId: req.body.auctionProductId,
        auctionStartAmount: req.body.auctionStartAmount,
        //  productObject:prodObject ,
        productObject: prodObject,
        // time:req.body.time,
        // auctionTimer:,
        startAuction: '0',
        paid: '0'
        //  status: '0'

    });
    auc.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Auction save :' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/winner', (req, res) => {
    console.log('request recieved', req.body);
    var auctionId = req.body.auctionId;
    var auctionObject =
        // new Auction(
        {
            userId: req.body.userId,
            auctionProductId: req.body.auctionProductId,
            auctionStartAmount: req.body.auctionStartAmount,
            // productObject:req.body.productObject,
            startAuction: 2,
            auctionTimer: 'HH:mm:ss',
            paid: 466660,
        }
    // );

    Auction.findByIdAndUpdate(auctionId, {
        $set: auctionObject
    }, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.status(200).send({
                message: 'Record updated successfully',
                data: doc,
                statusCode: 200
            });
        } else {
            console.log('Error in Editing Auctions Update :' + JSON.stringify(err, undefined, 2));
        }
    })
    var message = `Dear ${req.body.firstName} ${req.body.lastName}, you have won the auction of ${req.body.productName}. Your unique reference number is ${req.body.auctionRef}. Please visit our office
    with your unique Reference Number to retrieve your Item.`

    // var prodObject=JSON.stringify(req.body.productObject);
    //   


    const mailer = {
        SEND_MAIL(sendTo, message) {
            var request = mailjet
                .post("send")
                .request({
                    "FromEmail": "femishotolaa@gmail.com",
                    "FromName": "Auctions.ng",
                    "Subject": "You are a winner!",
                    "Text-part": `Dear ${req.body.firstName} ${req.body.lastName}, you have won the auction of ${req.body.productName}. Your ref number is ${req.body.auctionRef}. Please visit our office
                    with your unique Reference Number to retrieve your Item. If you need more clarification, please visit our FAQ page on our website for more details or call 0816337217. `,
                    // "Html-part":"<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!",
                    "Recipients": [
                        // {
                        //         "Email": sendTo
                        //         // "fmshot@yahoo.com"
                        // },

                        {
                            "Email": req.body.email
                        },

                    ]
                });
            request
                .then(result => {
                    console.log(`mail sent t5o ${req.body.email}`, result.body)
                })
                .catch(err => {
                    console.log('could not send maoil', err)
                })
            // .on('success', function (response, body) {
            //     console.log (response.statusCode, body);
            // })
            // .on('error', function (err, response) {
            //     console.log (response.statusCode, err);
            // });
        }
    }
    mailer.SEND_MAIL(req.body.email, message);

    //    else { console.log('Error in Auction save :' + JSON.stringify(err, undefined, 2)); }

});


router.post('/dump', (req, res) => {
    return req;
    console.log('request recieved', req);


});
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id : ${req.params.id}`);

    Auction.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.status(200).send({
                message: 'Record updated successfully',
                data: doc,
                statusCode: 200
            });
        } else {
            console.log('Error in Editing Auctions Update :' + JSON.stringify(err, undefined, 2));
        }
    })
});

// router.put('timer/:id', (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
// return res.status(400).send(`No records with given id : ${req.params.id}`);

// Auction.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true}, (err, doc) => {
//     if (!err) {
//      res.status(200).send({message: 'Record updated successfully', data: doc, statusCode: 200});
// }
// else { console.log('Error in Editing Auctions Update :' + JSON.stringify(err, undefined, 2)); }
// })
// });


router.put('/toggle/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    }
    Auction.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.status(200).send({
                message: 'Record updated successfully',
                data: doc,
                statusCode: 200
            });
        } else {
            console.log('Error in User Status Update :' + JSON.stringify(err, undefined, 2));
        }
    });
})


router.put('/toggle/paid:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    }
    Auction.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.status(200).send({
                message: 'Record updated successfully',
                data: doc,
                statusCode: 200
            });
        } else {
            console.log('Error in User Status Update :' + JSON.stringify(err, undefined, 2));
        }
    });
})



router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Auction.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Auctions Delete :' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;