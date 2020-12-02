
var admin = require('firebase-admin');
const fb = require('firebase');
var serviceAccount = require('./keys.json');

// server sdk
const startFireBase = function () {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://nodejspoc-619dc.firebaseio.com"
      });
}

// client side sdk
const startFireBaseWithApi = function () {
    fb.initializeApp({
        apiKey: "AIzaSyDRIHQyVVUPuNG5QgCDfoonQCLGQ2PVjZA",
        authDomain: "nodejspoc-619dc.firebaseapp.com",
        databaseURL: "https://nodejspoc-619dc.firebaseio.com",
      })
}

module.exports = {startFireBase, startFireBaseWithApi}