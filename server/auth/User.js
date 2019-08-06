const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { dbPath } = require('../config/index.js')
module.exports = function () {
  const db = mongoose.connect(dbPath, { useNewUrlParser: true });
  const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    photoUrl: { type: String},
    email: {
      type: String, required: true, trim: true, unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    facebookProvider: {
      type: {
        id: String
      },
      select: false
    },
    favourites: []
  });
  UserSchema.set('toJSON', { getters: true, virtuals: true });

  UserSchema.statics.upsertFbUser = function (profile, cb) {
    return this.findOne({ 'facebookProvider.id': profile.id }, (err, user) => {
      if (!user) {
        const newUser = new this({
          name: profile.displayName,
          photoUrl: `https://graph.facebook.com/${profile.id}/picture?type=large`,
          email: profile.emails[0].value,
          facebookProvider: {
            id: profile.id
          }
        });
        newUser.save(
          function (error, savedUser) {
            if (error) {
            }
            return cb(error, savedUser);
          });
      }
      else {
        return cb(err, user);
      }
    });
  };

  UserSchema.statics.pushFavourite = function (id, location_id, cb) {
    return this.update(
      { _id: id }, 
      { $addToSet: { favourites: location_id } },
      cb
  );
  }

  UserSchema.statics.findUserById = function (id, cb) {
    return this.findOne({
      '_id': id
    }, function (err, user) {
      return cb(err, user);
    });
  };


  mongoose.model('User', UserSchema);

  return db;
};