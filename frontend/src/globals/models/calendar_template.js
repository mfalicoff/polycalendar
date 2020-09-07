import Week from './week_template'
import addDay from '../dateHelpers'

export default class CalendarTemplate {
    constructor(startDate, endDate, daysOff, vacationWeek){
        this.currentDate = startDate;
        this.calendar = []

        let weeks = Math.round((endDate - startDate) / (7 * 24 * 60 * 60 * 1000))
        
        for(let i = 0; i <= weeks; i++){
            if(this.currentDate.getTime() === addDay(endDate, 1).getTime()){
                break;
            }
            let week = new Week(i, 0, this.currentDate, 0, daysOff)
            this.calendar.push(week)
            this.currentDate = addDay(this.currentDate, 7)
        }
        
    }
}