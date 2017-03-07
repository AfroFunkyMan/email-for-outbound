let nodemailer = require('nodemailer');
const fs = require('fs');

let transporter = nodemailer.createTransport({
    name: 'prodazha-optom.ru',
    maxConnections: 50,
    maxMessages: 10,
    pool: true,
    port: 587,
    auth: {
        user: 'user1',
        pass: 'password1'
    }
});
let text = fs.readFileSync('../text.txt', 'utf8');
let html = fs.readFileSync('../index.html', 'utf8');
let email = 'web-rif3g@mail-tester.com';

let mailOptions = {
    headers: {
        "List-Unsubscribe": "<http://prodazha-optom.ru/unsubscribe/7891212387>"
    },
    from: '"ТД Армасети" <admin@prodazha-optom.ru>', // sender address
    to: email, // list of receivers
    subject: `Краны 30нж - Лучше всех`,
    text: template(text, {email: email}),// Subject line {email: item.email}
    html: template(html, {email: email})
};
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log(`Message sent:  ${info.response}`);
    }
});

function template(text, option){
    return Object.keys(option).reduce(function (sum, current) {
        return sum.replace(new RegExp(`\\[\\(${current}\\)\\]`, 'gi'),option[current]);
    },text);
}
