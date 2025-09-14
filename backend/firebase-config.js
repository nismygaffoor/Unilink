const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "unilink-ffb98.firebasestorage.app"
});

// const db = admin.firestore();
// const storage = admin.storage(); // Commented out for now
const auth = admin.auth();

module.exports = { admin,  auth };
