
function getDbPath() {
  // if (process.env.NODE_ENV === 'production') {
    // if (process.env.MONGOLAB_URI) 
    return process.env.MONGOLAB_URI;
    // else return 'mongodb://localhost:27017/local';
  // } else return 'mongodb://localhost:27017/local';
}

function getClientUrl() {
  if (process.env.NODE_ENV === 'production') return process.env.MONGOLAB_URI;
  else return 'http://localhost:3000';
}

const facebookAuth = process.env.NODE_ENV === 'production' ?
{
  'clientID': process.env.FACEBOOK_CLIENTID,
  'clientSecret': process.env.FACEBOOK_SECRET,
  'callbackURL': 'http://localhost:8000/api/auth/facebook/callback',
  'profileURL': 'https://graph.facebook.com/v3.3/me?fields=first_name,last_name,email'
} :
{
  'clientID': process.env.FACEBOOK_CLIENTID_DEV,
  'clientSecret': process.env.FACEBOOK_SECRET_DEV,
  'callbackURL': 'http://localhost:8000/api/auth/facebook/callback',
  'profileURL': 'https://graph.facebook.com/v3.3/me?fields=first_name,last_name,email'
} ;

module.exports = {
  db: getDbPath(),
  dbPath: getDbPath(),
  dbName: 'maps',
  dbAUTH: 'auth',
  facebookAuth
};