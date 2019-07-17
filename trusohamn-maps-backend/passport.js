require('./mongoose')();
const passport = require('passport');
const User = require('mongoose').model('User');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./config');
module.exports = function () {
    passport.use(new FacebookTokenStrategy({
        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret
    },
        (accessToken, refreshToken, profile, done) => {
            User.upsertFbUser(accessToken, refreshToken, profile,
                function (err, user) {
                    return done(err, user);
                });
        }));
};