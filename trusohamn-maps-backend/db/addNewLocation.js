const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
const url = config.db;

function insert(entry) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) return reject(err);
            var dbo = db.db(config.dbName);
            dbo.collection('location').insertOne(entry, (err) => {
                db.close();
                if (err) return reject(err);
                console.log('1 location inserted');
                return resolve(entry._id);
            });
        });
    });
}

function insertMock() {
    console.log('calling addNewLocation Mock');
    return new Promise((resolve) => {
        resolve('entry id');
    });
}

module.exports.insert = process.env.NODE_ENV === 'production' ? insert : insertMock;
