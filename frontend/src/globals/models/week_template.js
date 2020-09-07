import Day from './day_template'
import addDay from '../dateHelpers'

export default class WeekTemplate{

    constructor(weekNumber, alternance, weekStart, vacationWeek, daysOff){
        this.weekNumber = weekNumber
        this.alternance = alternance
        this.week = [];
        let currentDay = weekStart
        for(let i = 0; i < 7; i++){
            let val = 0
             if(i < 5){
                 let val = i;
             }
             let day = new Day(val, currentDay)
             this.week.push(day)
             currentDay = addDay(currentDay, 1)

        }
    }

    
}
