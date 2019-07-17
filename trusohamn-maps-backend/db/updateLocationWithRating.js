const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const url = config.db;

function update(id, rating) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) return reject(err);
            const dbo = db.db(config.dbName);
            dbo
                .collection('location')
                .updateOne(
                    { '_id': id },
                    {  $set: {'rating': rating}  },
                    (err) => {
                        db.close();
                        if (err) return reject(err);
                        resolve('ok');
                    });
        });
    });
}

function updateMock(id, rating) {
}



module.exports.update = update; // process.env.NODE_ENV === 'production' ? update : updateMock;
