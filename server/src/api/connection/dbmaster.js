import mongoose from 'mongoose';

const dbUrl = process.env.DB_URL
const db = mongoose.createConnection(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on('connected', () => {
  console.log('Mongoose connection open to master DB');
});

db.on('error', (err) => {
  console.debug(`Mongoose connection error for master DB: ${err}`);
});

db.on('disconnected', () => {
  console.debug('Mongoose connection disconnected for master DB');
});

db.on('reconnected', () => {
  console.info('Mongoose connection reconnected for master DB');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  db.close(() => {
    console.debug(
      'Mongoose connection disconnected for master DB via app termination',
    );
    process.exit(0);
  });
});

export default db;
