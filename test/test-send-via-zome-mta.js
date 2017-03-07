let nodemailer = require('nodemailer');
const fs = require('fs');

let transporter = nodemailer.createTransport({
    name: 'prodazha-optom.ru',
    port: 587,
    auth: {
        user: 'zone',
        pass: 'test'
    }
});

let mailOptions = {
    headers: {
        "List-Unsubscribe": "<http://prodazha-optom.ru/unsubscribe/7891212387>"
    },
    from: '"ТД Армасети" <admin@prodazha-optom.ru>', // sender address
    to: 'web-5a4wh@mail-tester.com', // list of receivers
    subject: 'СКЛАДСКИЕ ОСТАТКИ С ЦЕНАМИ НА 06.02.17 ➡',
    text: fs.readFileSync('./text.txt', 'utf8'),// Subject line
    html: fs.readFileSync('./index.html', 'utf8') // html body
};
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log(`Message sent:  ${info.response}`);
    }
});



//maxConnections: 100,   no repeats
// maxMessages: 20,
//     rateLimit: 10,