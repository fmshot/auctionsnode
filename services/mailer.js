var mailjet = require ('node-mailjet')
    .connect('e74159dfb70877ff46d83c0b832d70b0', 'f5014e26e4fee1e054dc0d402fc5fb3f')
    const mailer = {
        SEND_MAIL (sendTo, message) {
            var request = mailjet
            .post("send")
            .request({
                "FromEmail":"femishotolaa@gmail.com",
                "FromName":"Mailjet Pilot",
                "Subject":"Your email flight plan!",
                "Text-part":"Dear passenger, welcome to Mailjet! May the delivery force be with you!",
                // "Html-part":"<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!",
                "Recipients":[
                        {
                                "Email": sendTo
                                // "fmshot@yahoo.com"
                        }
                ]
            });
        request
                .then(result => {
                    console.log(result.body)
                })
                .catch(err => {
                    console.log(err.statusCode)
                })
            // .on('success', function (response, body) {
            //     console.log (response.statusCode, body);
            // })
            // .on('error', function (err, response) {
            //     console.log (response.statusCode, err);
            // });
        }
    }
    module.exports = mailjet;