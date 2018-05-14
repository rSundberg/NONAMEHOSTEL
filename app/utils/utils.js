import moment from 'moment'

export function getDateRange(startDate, endDate, dateFormat) {
    let dates = [],
        end = moment(endDate),
        diff = endDate.diff(startDate, 'days');

    if (!startDate.isValid() || !endDate.isValid() || diff <= 0) {
        return;
    }

    for (let i = 0; i < diff; i++) {
        dates.push(end.subtract(1, 'd').format(dateFormat));
    }

    return dates;
}

export function isBeforeDay(a, b) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) 
        return false;
    
    const aYear = a.year();
    const aMonth = a.month();

    const bYear = b.year();
    const bMonth = b.month();

    const isSameYear = aYear === bYear;
    const isSameMonth = aMonth === bMonth;

    if (isSameYear && isSameMonth) 
        return a.date() < b.date();
    if (isSameYear) 
        return aMonth < bMonth;
    return aYear < bYear;
}

export function isInclusivelyAfterDay(a, b) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) 
        return false;
    return !isBeforeDay(a, b);
}