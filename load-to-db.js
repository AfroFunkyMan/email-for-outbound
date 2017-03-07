const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
// Connection URL
let url = 'mongodb://localhost:27017/mailsender';
// Use connect method to connect to the Server

let contacts_collection;

MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server");
    contacts_collection = db.collection('contacts');
    loadFile();
});


function loadFile() {
        let contacts = [
            'afro.funky.lover@gmail.com',
            'ruslan@notany-dev.ru',
            'ruslan.armaseti@yandex.ru',
            'notany-dev@yandex.ru'
        ];
        contacts.forEach(function (rawcontact) {
           //check and valid
            saveInDB(rawcontact);
        });
}


function validateEmail(email) {
    if (email.search(/[а-я,А-Я]/) >= 0) return false;
    if (email.search(/[^A-Za-z0-9@\-.+_]/) >= 0) return false;
    else if (email.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == 0) return true;
}

function saveInDB(email) {
    let obj = {
        email: email,
        status: 'subscriber',
        fields: {
            group: 'test'
        },
        activities: []
    };
    contacts_collection.insertOne(obj);
}
