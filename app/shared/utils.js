export function importLocalforage() {
    const config = {
        name: 'noname hostel',
        version: 1.0
    }

    return import(/* webpackChunkName: 'localforage' */ 'localforage')
        .then(localforage => {
            localforage.default.config(config)

            return localforage
        })
        .catch(err => console.log(err))
}


export function importFirebase(config, modulesArr) {
    return import(/* webpackChunkName: 'firebase' */ 'firebase/app')
        .then(firebase => {
            if (!firebase.apps.length) {
                firebase.initializeApp(config)
            }
            
            return firebase
        })
        .then(firebase => Promise.all(modulesArr).then(() => firebase))
        .then(firebase => {
            firebase.firestore().settings({timestampsInSnapshots: true})

            return {
                firestore: firebase.firestore(),
                auth: firebase.auth(),
                functions: firebase.functions(),
                storage: firebase.storage()
            }
        })
        .catch(err => console.log(err))
}

export function importMoment() {
    return import(/* webpackChunkName: 'moment'*/ 'moment').then(moment => moment.default)
}

export function getDateRange(startDate, endDate, dateFormat, moment) {
    let dates = [],
        end = moment(endDate),
        diff = endDate.diff(startDate, 'days')

    if (!startDate.isValid() || !endDate.isValid() || diff <= 0) {
        return
    }

    for (let i = 0; i < diff; i++) {
        dates.push(end.subtract(1, 'd').format(dateFormat))
    }

    return dates
}

export function isBeforeDay(a, b, moment) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) 
        return false
    
    const aYear = a.year()
    const aMonth = a.month()

    const bYear = b.year()
    const bMonth = b.month()

    const isSameYear = aYear === bYear
    const isSameMonth = aMonth === bMonth

    if (isSameYear && isSameMonth) 
        return a.date() < b.date()
    if (isSameYear) 
        return aMonth < bMonth
    return aYear < bYear
}

export function isInclusivelyAfterDay(a, b, moment) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false

    return !isBeforeDay(a, b, moment)
}