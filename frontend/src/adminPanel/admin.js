import React, {useState} from 'react'

function Admin() {
    const [startDateI, setStartDateI] = useState('')
    const [startDate, setStartDate] = useState()
    const [endDateI, setendDateI] = useState('')
    const [endDate, setendDate] = useState()
    const [calendar, setCalendar] = useState([])
    
    const createCalendar = () => {

        let weeks = Math.round((endDate - startDate) / (7 * 24 * 60 * 60 * 1000))
        console.log(weeks)
        let week = []
        let cal = []
        for(let i = 0; i <= weeks; i++){
            for(let day = 1; day <= 5; day++){
                week.push(day)
            }
            cal.push(week)
            week = []
        }
        setCalendar(cal)
    }

    const dateMan = (start, end) => {
        let endYear = end.substring(0, 4)
        let endMonth = end.substring(5, 7)
        let endDay = end.substring(8, 10)
        let dateEnd = `${endMonth}/${endDay}/${endYear}`

        let startYear = start.substring(0, 4)
        let startMonth = start.substring(5, 7)
        let startDay = start.substring(8, 10)
        let dateStart = `${startMonth}/${startDay}/${startYear}`

        setStartDate(new Date(dateStart))
        setendDate(new Date(dateEnd))
    }




    const clickHandler = (event) => {
        event.preventDefault()

        dateMan(startDateI, endDateI)
        setendDateI('')
        setStartDateI('')
        
        
    }

    const onChangeStart = (event) => {
        console.log(event.target.value)
        setStartDateI(event.target.value)
    }

    const onChangeEnd = (event) => {
        console.log(event.target.value)
        setendDateI(event.target.value)
    }

    return (
        <div>
            <h1>admin</h1>
            <form onSubmit={clickHandler}>
                <input type='date' onChange={onChangeStart} value={startDateI}></input>
                <input type='date' onChange={onChangeEnd} value={endDateI}></input>
                <div>
                    <button type='submit'> submit</button>
                </div>
            </form>
            {
                endDate === undefined ? (
                    <div>
                        <h3> Date not entered</h3>
                    </div>
                ) : (
                <div>
                    <h3>{startDate.toDateString()} - {endDate.toDateString()}</h3>
                    <button type='submit' onClick={() => createCalendar()}> create calendar</button>
                    {console.log(calendar)}
                </div>
                )
            }

            
        </div>
    )
}

export default Admin