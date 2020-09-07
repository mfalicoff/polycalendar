import Week from './week_template'
import addDay from '../dateHelpers'

export default class CalendarTemplate {
    constructor(startDate, endDate, daysOff, vacationWeek, semaine1Alt, joursAlt){
        this.currentDate = startDate;
        this.calendar = []
        this.currentAlt;
        this.vac = false

        if(semaine1Alt === 'B1'){
            this.currentAlt = true
        }else if(semaine1Alt === 'B2'){
            this.currentAlt = false
        }

        let weeks = Math.round((endDate - startDate) / (7 * 24 * 60 * 60 * 1000))
        
        for(let i = 0; i <= weeks; i++){
            if(this.currentDate.getTime() === addDay(endDate, 1).getTime()){
                break;
            }
            let week = new Week(i, this.currentAlt, this.currentDate, this.vac, daysOff)
            this.calendar.push(week)
            this.currentDate = addDay(this.currentDate, 7)
            if(i != Number(vacationWeek)-3){
                this.currentAlt = !this.currentAlt
                this.vac = false
                
            }else{
                this.vac = true
            }
            
        }
        
    }
}