const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { dbPath } = require('./config/index.js')
module.exports = function () {
  const db = mongoose.connect(dbPath);
  const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    photoUrl: { type: String},
    email: {
      type: String, required: true, trim: true, unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    facebookProvider: {
      type: {
        id: String,
        token: String
      },
      select: false
    }
  });
  UserSchema.set('toJSON', { getters: true, virtuals: true });

  UserSchema.statics.upsertFbUser = function (accessToken, refreshToken, profile, cb) {
    return this.findOne({ 'facebookProvider.id': profile.id }, (err, user) => {
      if (!user) {
        const newUser = new this({
          name: profile.displayName,
          photoUrl: `https://graph.facebook.com/${profile.id}/picture?type=large`,
          email: profile.emails[0].value,
          facebookProvider: {
            id: profile.id,
            token: accessToken
          }
        });
        newUser.save(
          function (error, savedUser) {
            if (error) {
              console.log(error);
            }
            return cb(error, savedUser);
          });
      }
      else {
        return cb(err, user);
      }
    });
  };

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