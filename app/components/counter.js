import React, {Fragment} from 'react'

const Counter = ({title, count, limit, updateCount, showAll}) => {
    const rangeArr = limit => {
        let range = []

        for (let i = 1; i < limit + 1; i++) {
            range.push(i)
        }

        return range
    }

    return (
        <div className={'Counter'}>
            <h3 className={'Counter__title'}>
                {title}
            </h3>

            {showAll ?
                <div className={'Counter__rangeWrapper'}>
                    {
                        rangeArr(limit).map(range =>
                            <div
                                key={range}
                                className={`Counter__range ${range === count ? 'Counter__range--active': ''}`}
                                onClick={() => updateCount(range)}>
                                {range}
                            </div>
                        )
                    }
                </div> :
                <Fragment>
                    <div className={`${count === 1 ? 'Counter--disabled' : ''}`} onClick={() => updateCount(count - 1)}>
                        {count === 1
                            ? ''
                            : '-'}
                    </div>

                    <div>
                        {count}
                    </div>

                    <div onClick={() => updateCount(count + 1)}>
                        +
                    </div>
                </Fragment>
            }
        </div>
    )
}

export default Counter