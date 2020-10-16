import Day from './day_template';
import addDay from '../dateHelpers';

export default class WeekTemplate {
	constructor(weekNumber, alternance, weekStart, vacationWeek, daysOff) {
		this.weekNumber = weekNumber;
		this.week = [];
		let currentDay = weekStart;

		this.vraiAlternance = [];

		for (let i = 0; i < 7; i++) {
			let val = 0;
			let test = daysOff.map((day) => day.getTime());
			let alt = '';
			if (i < 5) {
				val = i+1;
				alt = alternance[i];
			}
			if (test.includes(currentDay.getTime()) || vacationWeek) {
				val = 0;
				alt = '';
			}
			if (vacationWeek) {
				val = 0;
				alt = '';
			}
			this.vraiAlternance.push(alt);
			let day = new Day(val, currentDay, alt);
			this.week.push(day);
			currentDay = addDay(currentDay, 1);
		}
	}

	getAlternance() {
		this.vraiAlternance.splice(5, 2);
		return this.vraiAlternance;
	}
}
