const functions = require('firebase-functions')
const admin = require('firebase-admin')
const moment = require('moment')

const cors = require('cors')({
    origin: true,
})

admin.initializeApp()

exports.home = functions.https.onRequest((req, res) => {
    res.json({test: 'test'})
})

exports.addBooking = functions.https.onRequest((req, res) => cors(req, res, () => {
    let bookingInfo = JSON.parse(req.query.bookingInfo)
    let location = req.query.location
    let bed_type = req.query.bed_type
    let bookingsRef = admin.firestore()
        .collection("locations")
        .doc(location)
        .collection('beds')
        .doc(bed_type)
        .collection('bookings')

    bookingsRef
        .add(bookingInfo)
        .then(ref => res.json(`added booking ${ref.id}`))
        .catch(err => res.json(`error ${err}`))
}))

exports.bedLimit = functions.https.onRequest((req, res) => cors(req, res, () => {
    let location = req.query.location
    let bed_type = req.query.bed_type
    let bedRef = admin.firestore()
        .collection('locations')
        .doc(location)
        .collection('beds')
        .doc(bed_type)

    bedRef
        .get()
        .then(doc => {
            if (!doc.empty) {
                return res.json({limit: doc.data().limit})
            } else {
                return res.json(null)
            }
        })
        .catch(err => res.json({error: err}))
}))

exports.locationData = functions.https.onRequest((req, res) => cors(req, res, () => {
    let location = req.query.location
    let bed_type = req.query.bed_type

    admin.firestore()
        .collection("locations")
        .doc(location)
        .collection('beds')
        .doc(bed_type)
        .collection('bookings')
        .get()
        .then(doc => {
            if (!doc.empty) {
                return res.json({docs: doc.docs.map(doc => doc.data())})
            } else {
                return res.json(null)
            }
        })
        .catch(err => {
            return res.json({error: err})
        })
}))

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