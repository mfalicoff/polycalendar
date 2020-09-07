import React, {useState} from 'react'
import Togglable from '../components/togglable'
import '../App.css'

function Admin() {
    const [startDateI, setStartDateI] = useState('')
    const [startDate, setStartDate] = useState()
    const [endDateI, setendDateI] = useState('')
    const [endDate, setendDate] = useState()
    const [calendar, setCalendar] = useState()
    const [Dates, setDates] = useState([])
    const [newDates, setNewDate] = useState([{Date: ""}])
    
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
        let dates = newDates.filter(date => date.Date !== '')
        setDates(dates)
        setNewDate([{Date: ""}])
        setendDateI('')
        setStartDateI('')
        
        
    }

    const onChangeStart = (event) => {
        setStartDateI(event.target.value)
    }

    const onChangeEnd = (event) => {
        setendDateI(event.target.value)
    }

    const handleAddClick = () => {
        setNewDate([...newDates, { Date: ""}]);
      };

    const handleRemoveClick = index => {
        const list = [...newDates];
        list.splice(index, 1);
        setNewDate(list);
    };

    const onChangeDate = (event, index) => {
        setNewDate[index] = event.target.value
        const Date = event.target.value;
        const list = [...newDates];
        list[index].Date = Date
        setNewDate(list);
    }

    return (
        <div>
            <h1>admin</h1>
            <form onSubmit={clickHandler}>
                <input type='date' onChange={onChangeStart} value={startDateI}></input>
                <input type='date' onChange={onChangeEnd} value={endDateI}></input>
                
                <div>
                    <br/>
                    Vacation is on week number: <input type='number'></input>
                    <br/>
                    Additional days off:
                    {
                        newDates.map((date, i)=> {
                            return(
                                <div key={i} id='additionDaysOff'>
                                    <input type='date' onChange={event => onChangeDate(event, i)} value={newDates[i].Date}></input>
                                    {newDates.length !== 1 && <button onClick={handleRemoveClick}>Remove</button>}
                                    {newDates.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                                </div>
                                    
                            )
                        })
                    }
                    

                    
                </div>
                <div>
                    <br/>
                    <button type='submit'> submit</button>
 
                </div>
            </form>
            {
                endDate === undefined ? (
                    <div>
                        <h3> Dates not entered</h3>
                    </div>
                ) : (
                <div>
                    <h3>Semester Starts: {startDate.toDateString()} and Ends: {endDate.toDateString()}</h3>
                    <button type='submit' onClick={() => createCalendar()}> create calendar</button>
                    {console.log(calendar, Dates)}
                </div>
                )
            }

            
        </div>
    )
}

export default Admin