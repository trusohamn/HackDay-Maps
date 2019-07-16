
function getDbPath() {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.MONGOLAB_URI) return process.env.MONGOLAB_URI;
    else return 'mongodb://localhost:27017/local';
  } else return 'mongodb://localhost:27017/local';
}

function getClientUrl() {
  if (process.env.NODE_ENV === 'production') return process.env.MONGOLAB_URI;
  else return 'http://localhost:3000';
}

module.exports = {
  db: getDbPath(),
  dbPath: getDbPath(),
  dbName: 'maps',
  dbAUTH: 'auth'
};