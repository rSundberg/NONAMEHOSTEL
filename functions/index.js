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

function bedBookings(location, bedType) {
    return admin.firestore()
        .collection("locations")
        .doc(location)
        .collection('beds')
        .doc(bedType)
        .collection('bookings')
}

function bedType(location, bedType) {
    return admin.firestore()
        .collection("locations")
        .doc(location)
        .collection('beds')
        .doc(bedType)
}

function getDateRange(startDate, endDate, dateFormat) {
    let dates = [],
        end = moment(endDate),
        diff = endDate.diff(startDate, 'days')

    if (!startDate.isValid() || !endDate.isValid() || diff <= 0) {
        return []
    }

    for (let i = 0; i < diff; i++) {
        dates.push(end.subtract(1, 'd').format(dateFormat))
    }

    return dates
}

exports.blockedDates = functions.https.onRequest((req, res) => cors(req, res, () => {
    let location = req.query.location
    let bed_type = req.query.bed_type
    let requestedAmount = req.query.requested_amount

    let limit = bedType(location, bed_type)
        .get()
        .then(doc => {
            if (!doc.empty) {
                return doc.data()
            } else {
                throw new Error('No limit found')
            }
        })
        .then(({limit}) => limit)
        .catch(err => res.json({error: err}))

    bedBookings(location, bed_type)
        .where('start_date', '>=', moment().format('YYYY-MM-DD'))
        .get()
        .then(doc => {
            if (!doc.empty) {
                return doc.docs.map(doc => doc.data())
            } else {
                throw new Error('No bookings found')
            }
        })
        .then(data => {
            return limit
                .then(limit => {
                    let bookingsPerDate = data.reduce((obj, { start_date, end_date, bed_count, room_count }) => {
                        let dateArr = getDateRange(moment(start_date), moment(end_date), 'YYYY-MM-DD')
                        let amountPerDay = dateArr.reduce((dateObj, date) => {
                            let amount = room_count
                                ? obj[date]
                                    ? obj[date] + room_count
                                    : room_count
                                : obj[date]
                                    ? obj[date] + bed_count
                                    : bed_count

                            return Object.assign(dateObj, {
                                [date]: amount
                            })
                        }, {})

                        return Object.assign(obj, amountPerDay)
                    }, {})

                    const blockedDates = Object
                        .keys(bookingsPerDate)
                        .filter(key => bookingsPerDate[key] >= limit - requestedAmount)

                    return res.json(blockedDates)
                })
        })
        .catch(err => res.json({error: err}))
}))

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