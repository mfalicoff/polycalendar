import Week from './week_template'
import addDay from '../dateHelpers'

export default class CalendarTemplate {
    constructor(startDate, endDate, daysOff, vacationWeek, firstweek){
        this.currentDate = startDate;
        this.calendar = []
        this.currentAlt = firstweek;
        this.vac = false
        this.currentWeek = firstweek;
        let test = daysOff.map(day => day.getTime())
        this.previousconfig = []


        let weeks = Math.round((endDate - startDate) / (7 * 24 * 60 * 60 * 1000))
        
        for(let i = 0; i <= weeks; i++){
            if(i !== 0 ){
                let update = []
                for(let j = 0; j < 5; j++){
                    update[j] = this.currentWeek[i]
                    if(update[j] === 'B1'){
                        update[j] = 'B2'
                    }else if(update[j] === 'B2'){
                        update[j] = 'B1'
                    }else if(update[j] === ''){
                        this.previousconfig === 'B1' ? update[j] = 'B2' : update[j] = 'B1'
                    }
                }
                this.currentWeek = update
            }
            if(this.currentDate.getTime() === addDay(endDate, 1).getTime()){
                break;
            }
            let week = new Week(i, this.currentWeek, this.currentDate, this.vac, daysOff)
            this.calendar.push(week)
            this.currentDate = addDay(this.currentDate, 7)
            if(i != Number(vacationWeek)-3){
                this.vac = false
                
            }else{
                this.vac = true
            }
            this.previousconfig = this.currentWeek
            this.currentWeek = week.getAlternance()
            
        }
        
    }
}