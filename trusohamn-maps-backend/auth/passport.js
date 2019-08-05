require('./User')();
const User = require('mongoose').model('User');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('../config');
module.exports = function () {
    passport.use(new FacebookTokenStrategy({
        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret
    },
        (token1, token2, profile, done) => {
            User.upsertFbUser(profile,
                function (err, user) {
                    return done(err, user);
                });
        }));
};