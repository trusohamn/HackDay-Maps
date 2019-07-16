module.exports = {

    'facebookAuth': {
        'clientID': process.env.FACEBOOK_CLIENTID,
        'clientSecret': process.env.FACEBOOK_SECRET,
        'callbackURL': 'http://localhost:8000/api/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v3.3/me?fields=first_name,last_name,email'
    }
};
