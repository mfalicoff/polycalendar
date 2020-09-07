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
            let test = daysOff.map(day => day.getTime())
            //console.log(test, currentDay.getTime(), test.includes(currentDay.getTime()))
             if(i < 5){
                 console.log('set i')
                 val = i;
             }if(test.includes(currentDay.getTime()) || vacationWeek){
                console.log('set 0 vacDay')
                 val = 0
             }if(vacationWeek){
                 console.log('vacWeek')
                val = 0
             }
             let day = new Day(val, currentDay)
             console.log(day)
             this.week.push(day)
             currentDay = addDay(currentDay, 1)

        }
    }

    
}
