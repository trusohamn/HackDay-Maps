const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
const url = config.db;

function getAll() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) return reject(err);
            var dbo = db.db(config.dbName);
            dbo
            .collection('location')
            .find({})
            .toArray((err, result) => {
                db.close();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function getAllMock() {
    console.log('calling addNewLocation Mock');
    return new Promise((resolve) => {
        resolve('entry id');
    });
}

module.exports.getAll = process.env.NODE_ENV === 'production' ? getAll : getAllMock;
