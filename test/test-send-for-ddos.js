let nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    maxConnections: 100,
    maxMessages: 20,
    rateLimit: 10,
    pool: true,
    name: 'prodazha-optom.ru',
    port: 587,
    auth: {
        user: 'zone',
        pass: 'test'
    }
});
let emails = [
    'for-haraka1@prodazha-optom.ru',
    'for-haraka2@prodazha-optom.ru',
    'for-haraka3@prodazha-optom.ru',
    'for-mega-ddos@prodazha-optom.ru'
];
let count = 0;
emails.forEach(function (email) {
    for (let i = 0; i < 200; i++) {
        let mailOptions = {
            headers: {
                "List-Unsubscribe": "<http://prodazha-optom.ru/unsubscribe/7891212387>"
            },
            from: '"ТД Армасети" <admin@prodazha-optom.ru>', // sender address
            to: email, // list of receivers
            subject: `subject #${i}`,
            text: `text ${i}`,// Subject line
            html: `<b>html ${i}</b>` // html body
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                count++;
                console.log(`[${count}]: Message sent:  ${info.response}`);
            }
        });
    }
});


//maxConnections: 100,   no repeats
// maxMessages: 20,
//     rateLimit: 10,