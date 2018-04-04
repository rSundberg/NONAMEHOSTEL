const functions = require('firebase-functions');

exports.home = functions.https.onRequest((req, res) => {
    res.json({test:"test"})
})