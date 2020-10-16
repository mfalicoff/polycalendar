import ApiCalendar from './googleCalendar';
import { backOff } from 'exponential-backoff';

const createEventsService = async (calendar, classes) => {
	await ApiCalendar.setCalendar(
		await ApiCalendar.createCalendar('Automne 2020 PolyCalendar')
	);
	let events = [];
	for (let weekIndex = 0; weekIndex < calendar[0].weeks.length; weekIndex++) {
		let week = calendar[0].weeks[weekIndex].weekDays;

		for (let dayIndex = 0; dayIndex < week.length; dayIndex++) {
			let day = week[dayIndex];

			if (day.value !== 0) {
				for (let i = 0; i < classes.length; i++) {
					let horrTH = classes[i].horraire.TH;
					let horrTP = classes[i].horraire.TP;

					for (let j = 0; j < horrTH.length; j++) {
						let coursTH = horrTH[j];
						let dayInInt = new Date(day.date).getDay();
						if (dateMapper(coursTH.coursJoursTH) === dayInInt) {
							let traversingDay = new Date(day.date);

							let startTime = coursTH.coursHeureTH.substr(
								0,
								coursTH.coursHeureTH.indexOf(',')
							);
							let indexHourStart = startTime.indexOf('h');
							let hoursStart = '';
							for (let o = 0; o < indexHourStart; o++) {
								hoursStart = hoursStart + startTime[o];
							}
							let minuteStart = '';
							for (
								let o = indexHourStart + 1;
								o < startTime.length;
								o++
							) {
								minuteStart = minuteStart + startTime[o];
							}

							let dateStart = new Date(
								traversingDay.getFullYear(),
								traversingDay.getMonth(),
								traversingDay.getDate(),
								hoursStart,
								minuteStart
							);

							let endTime = coursTH.coursHeureTH.substr(
								coursTH.coursHeureTH.lastIndexOf(',') + 2,
								coursTH.coursHeureTH.length
							);
							let indexHourEnd = endTime.indexOf('h');
							let hoursEnd = '';
							for (let o = 0; o < indexHourEnd; o++) {
								hoursEnd = hoursEnd + endTime[o];
							}
							let minutesEnd = '';
							for (
								let o = indexHourEnd + 1;
								o < endTime.length;
								o++
							) {
								minutesEnd = minutesEnd + endTime[o];
							}
							hoursEnd = parseInt(hoursEnd) + 1;
							minutesEnd = parseInt(minutesEnd) - 10;
							let dateEnd = new Date(
								traversingDay.getFullYear(),
								traversingDay.getMonth(),
								traversingDay.getDate(),
								hoursEnd,
								minutesEnd
							);

							let eve = {
								summary: classes[i].name + ' ' + 'TH',
								description: coursTH.coursLocalTH,
								start: {
									dateTime: dateStart,
									timeZone: 'America/Toronto',
								},
								end: {
									dateTime: dateEnd,
									timeZone: 'America/Toronto',
								},
							};
							events.push(eve);
						}
					}

					for (let j = 0; j < horrTP.length; j++) {
						let coursTP = horrTP[j];
						let dayInInt = new Date(day.date).getDay();
						if (dateMapper(coursTP.coursJoursTP) === dayInInt) {
							let traversingDay = new Date(day.date);
							if (coursTP.coursHeureTP.indexOf('(') === -1) {
								let startTime = coursTP.coursHeureTP.substr(
									0,
									coursTP.coursHeureTP.indexOf(',')
								);
								let indexHourStart = startTime.indexOf('h');
								let hoursStart = '';
								for (let o = 0; o < indexHourStart; o++) {
									hoursStart = hoursStart + startTime[o];
								}
								let minuteStart = '';
								for (
									let o = indexHourStart + 1;
									o < startTime.length;
									o++
								) {
									minuteStart = minuteStart + startTime[o];
								}

								let dateStart = new Date(
									traversingDay.getFullYear(),
									traversingDay.getMonth(),
									traversingDay.getDate(),
									hoursStart,
									minuteStart
								);

								let endTime = coursTP.coursHeureTP.substr(
									coursTP.coursHeureTP.lastIndexOf(',') + 2,
									coursTP.coursHeureTP.length
								);
								let indexHourEnd = endTime.indexOf('h');
								let hoursEnd = '';
								for (let o = 0; o < indexHourEnd; o++) {
									hoursEnd = hoursEnd + endTime[o];
								}
								let minutesEnd = '';
								for (
									let o = indexHourEnd + 1;
									o < endTime.length;
									o++
								) {
									minutesEnd = minutesEnd + endTime[o];
								}
								hoursEnd = parseInt(hoursEnd) + 1;
								minutesEnd = parseInt(minutesEnd) - 10;
								let dateEnd = new Date(
									traversingDay.getFullYear(),
									traversingDay.getMonth(),
									traversingDay.getDate(),
									hoursEnd,
									minutesEnd
								);

								let eve = {
									summary: classes[i].name + ' ' + 'TP',
									description:
										'Local: ' + coursTP.coursLocalTP,
									start: {
										dateTime: dateStart,
										timeZone: 'America/Toronto',
									},
									end: {
										dateTime: dateEnd,
										timeZone: 'America/Toronto',
									},
								};
								events.push(eve);
							} else {
								let alt = coursTP.coursHeureTP.substring(
									coursTP.coursHeureTP.indexOf('(') + 1,
									coursTP.coursHeureTP.length - 1
								);
								if (alt === day.alternance) {
									console.log('alternance');
									let startTime = coursTP.coursHeureTP.substr(
										0,
										coursTP.coursHeureTP.indexOf(',')
									);
									let indexHourStart = startTime.indexOf('h');
									let hoursStart = '';
									for (let o = 0; o < indexHourStart; o++) {
										hoursStart = hoursStart + startTime[o];
									}
									let minuteStart = '';
									for (
										let o = indexHourStart + 1;
										o < startTime.length;
										o++
									) {
										minuteStart =
											minuteStart + startTime[o];
									}

									let dateStart = new Date(
										traversingDay.getFullYear(),
										traversingDay.getMonth(),
										traversingDay.getDate(),
										hoursStart,
										minuteStart
									);

									let endTime = coursTP.coursHeureTP.substr(
										coursTP.coursHeureTP.lastIndexOf(',') +
											2,
										5
									);
									let indexHourEnd = endTime.indexOf('h');
									let hoursEnd = '';
									for (let o = 0; o < indexHourEnd; o++) {
										hoursEnd = hoursEnd + endTime[o];
									}
									let minutesEnd = '';
									for (
										let o = indexHourEnd + 1;
										o < endTime.length;
										o++
									) {
										minutesEnd = minutesEnd + endTime[o];
									}
									hoursEnd = parseInt(hoursEnd) + 1;
									minutesEnd = parseInt(minutesEnd) - 10;
									let dateEnd = new Date(
										traversingDay.getFullYear(),
										traversingDay.getMonth(),
										traversingDay.getDate(),
										hoursEnd,
										minutesEnd
									);

									let eve = {
										summary: classes[i].name + ' ' + 'TP',
										description:
											'Local: ' +
											coursTP.coursLocalTP +
											' Semaine: ' +
											alt,
										start: {
											dateTime: dateStart,
											timeZone: 'America/Toronto',
										},
										end: {
											dateTime: dateEnd,
											timeZone: 'America/Toronto',
										},
									};
									events.push(eve);
								}
							}
						}
					}
				}
			}
		}
	}

	return await sendEvents(events);
};

const dateMapper = (dateInFrench) => {
	if (dateInFrench === 'Dimanche') {
		return 0;
	}
	if (dateInFrench === 'Lundi') {
		return 1;
	}
	if (dateInFrench === 'Mardi') {
		return 2;
	}
	if (dateInFrench === 'Mercredi') {
		return 3;
	}
	if (dateInFrench === 'Jeudi') {
		return 4;
	}
	if (dateInFrench === 'Vendredi') {
		return 5;
	}
	if (dateInFrench === 'Samedi') {
		return 6;
	}
};

const sendEvents = async (events) => {
	console.log(events);
	for (let index = 0; index < events.length; index++) {
		const element = events[index];
		try {
			//eslint-disable-next-line
			const response = await backOff(() =>
				ApiCalendar.sendEvent(element)
			);
			
		} catch (error) {
			console.log(error.message);
		}
	}
};

export default createEventsService;
