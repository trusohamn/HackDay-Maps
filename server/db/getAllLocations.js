const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
const url = config.db;

function getAll(query={}) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) return reject(err);
            var dbo = db.db(config.dbName);
            dbo
            .collection('location')
            .find(query)
            .toArray((err, result) => {
                db.close();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function getAllMock() {
    return new Promise((resolve) => {
        resolve('entry id');
    });
}

module.exports.getAll = getAll; //process.env.NODE_ENV === 'production' ? getAll : getAllMock;
