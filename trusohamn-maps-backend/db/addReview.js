const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const url = config.db;

function addReview(id, review) {
    return new Promise((resolve, reject) => {
            MongoClient.connect(url, (err, db) => {
                if (err) return reject(err);
                const dbo = db.db(config.dbName);
                dbo
                .collection('review')
                .updateOne(
                    { '_id': id },
                    { $push: { 'rev': review } }, { upsert: true }, 
                    (err) => {
                        db.close();
                        if (err) return reject(err);
                        resolve('ok');
                    });
            });
    });
}

function addReviewMock(id, review) {
}



module.exports.addReview = process.env.NODE_ENV === 'production' ? addReview : addReviewMock;
