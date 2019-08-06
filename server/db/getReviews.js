const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
const url = config.db;

function get(id) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) return reject(err);
            const dbo = db.db(config.dbName);
            dbo
            .collection('review')
            .find({ _id: id })
            .toArray((err, result) => {
                db.close();
                if (err) return reject(err);
                return resolve(result[0] ? result[0].rev : []);
            });
        });
    });
}

function getMock() {
    return new Promise((resolve) => {
        resolve('entry id');
    });
}

module.exports.get = get; // process.env.NODE_ENV === 'production' ? get : getMock;
