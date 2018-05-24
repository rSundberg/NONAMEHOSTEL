const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.home = functions.https.onRequest((req, res) => {
    res.json({test:"test"})
})

exports.addMember = functions.firestore
    .document('locations/{locationId}/beds/{bedId}/bookings/{bookingId}')
    .onCreate((change, context) => {
        const {name, email, country, phone} = change.after.data()
        const members = admin.firestore().collection('members')

        members.where("email", "==", email)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.empty) {
                    members.add({
                        name: name,
                        email: email,
                        country: country,
                        phone: phone
                    })
                }

                return querySnapshot
            })
            .catch(err => console.log(err))
    })