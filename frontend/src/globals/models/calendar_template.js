import Week from './week_template'
import addDay from '../dateHelpers'

export default class CalendarTemplate {
    constructor(startDate, endDate, daysOff, vacationWeek, firstweek){
        this.currentDate = startDate;
        this.calendar = []
        this.configAlt = []
        this.vac = false
        this.currentWeek = firstweek;


        let weeks = Math.round((endDate - startDate) / (7 * 24 * 60 * 60 * 1000))
        this.configAlt[0] = firstweek

        for(let i = 0; i <= weeks; i++){
            if(i !== 0 ){
                let update = []
                console.log(this.configAlt[i-1][0])
                for(let j = 0; j < 5; j++){
                    update[j] = this.currentWeek[j]
                    if(this.configAlt[i-1][j] == ''){
                        console.log("vac")
                        console.log(this.configAlt[i-2][j])
                        this.configAlt[i-2][j] === 'B1' ? update[j] = 'B2' : update[j] = 'B1'
                    }else if(update[j] === 'B1'){
                        update[j] = 'B2'
                    }else if(update[j] === 'B2'){
                        update[j] = 'B1'
                    }
                }
                this.currentWeek = update
            }
            if(this.currentDate.getTime() === addDay(endDate, 1).getTime()){
                break;
            }
            let week = new Week(i, this.currentWeek, this.currentDate, this.vac, daysOff)
            this.calendar.push(week)
            if(this.currentDate.getTime() === 1603684800000){
                this.currentDate = addDay(this.currentDate, 8)
            }else{
                this.currentDate = addDay(this.currentDate, 7)
            }
            
            if(i != Number(vacationWeek)-3){
                this.vac = false
                
            }else{
                this.vac = true
            }
            this.configAlt[i] = week.getAlternance()            
        }
        
    }
}