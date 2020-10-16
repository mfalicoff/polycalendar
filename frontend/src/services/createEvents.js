import ApiCalendar from './googleCalendar';
import { backOff } from 'exponential-backoff';

const createEventsService = async (calendar, classes) => {
    await ApiCalendar.setCalendar( await ApiCalendar.createCalendar("Automne 2020 PolyCalendar"))
	let events = [];
	for (let indec = 0; indec < calendar[0].weeks.length; indec++) {
		let week = calendar[0].weeks[indec].weekDays;
		for (let inde = 0; inde < week.length; inde++) {
			let day = week[inde];
			//console.log(day)
			//console.log(classes)
			if (day.value !== 0) {
				for (let i = 0; i < classes.length; i++) {
					let horrTH = classes[i].horraire.TH;
					let horrTP = classes[i].horraire.TP;

					//console.log(horrTH)
					for (let j = 0; j < horrTH.length; j++) {
						let ok = horrTH[j];
						//console.log(ok)
						let dayInInt = new Date(day.date).getDay();
						if (dateMapper(ok.coursJoursTH) === dayInInt) {
							let ok1 = new Date(day.date);

							let startTime = ok.coursHeureTH.substr(
								0,
								ok.coursHeureTH.indexOf(',')
							);
							//console.log(startTime)
							let indexHourStart = startTime.indexOf('h');
							//console.log(indexHourStart, )
							let hoursStart = '';
							for (let o = 0; o < indexHourStart; o++) {
								//console.log(startTime[o])
								hoursStart = hoursStart + startTime[o];
							}
							let minuteStart = '';
							for (
								let o = indexHourStart + 1;
								o < startTime.length;
								o++
							) {
								//console.log(startTime[o])
								minuteStart = minuteStart + startTime[o];
							}
							//console.log(hoursStart, minuteStart)

							let dateStart = new Date(
								ok1.getFullYear(),
								ok1.getMonth(),
								ok1.getDate(),
								hoursStart,
								minuteStart
							);
							//console.log(dateStart)

							let endTime = ok.coursHeureTH.substr(
								ok.coursHeureTH.lastIndexOf(',') + 2,
								ok.coursHeureTH.length
							);
							//console.log(endTime)
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
								ok1.getFullYear(),
								ok1.getMonth(),
								ok1.getDate(),
								hoursEnd,
								minutesEnd
							);
							//console.log(dateEnd)

							let eve = {
								summary: classes[i].name + ' ' + 'TH',
								description: ok.coursLocalTH,
								start: {
									dateTime: dateStart,
									timeZone: 'America/Toronto',
								},
								end: {
									dateTime: dateEnd,
									timeZone: 'America/Toronto',
								},
							};
							console.log(eve);
							events.push(eve);
							//ApiCalendar.createEvent(eve, "thks51mldef4rp7b7mt1icpvgo@group.calendar.google.com")
						}
					}

					for (let j = 0; j < horrTP.length; j++) {
						let ok = horrTP[j];
						//console.log(ok)
						let dayInInt = new Date(day.date).getDay();
						//console.log(dateMapper(ok.coursJoursTP), dayInInt, ok.coursHeureTP.indexOf("("))
						if (dateMapper(ok.coursJoursTP) === dayInInt) {
							let ok1 = new Date(day.date);
							if (ok.coursHeureTP.indexOf('(') === -1) {
								let startTime = ok.coursHeureTP.substr(
									0,
									ok.coursHeureTP.indexOf(',')
								);
								//console.log(startTime)
								//console.log(startTime)
								let indexHourStart = startTime.indexOf('h');
								//console.log(indexHourStart, )
								let hoursStart = '';
								for (let o = 0; o < indexHourStart; o++) {
									//console.log(startTime[o])
									hoursStart = hoursStart + startTime[o];
								}
								let minuteStart = '';
								for (
									let o = indexHourStart + 1;
									o < startTime.length;
									o++
								) {
									//console.log(startTime[o])
									minuteStart = minuteStart + startTime[o];
								}
								//console.log(hoursStart, minuteStart)

								let dateStart = new Date(
									ok1.getFullYear(),
									ok1.getMonth(),
									ok1.getDate(),
									hoursStart,
									minuteStart
								);
								//console.log(dateStart)

								let endTime = ok.coursHeureTP.substr(
									ok.coursHeureTP.lastIndexOf(',') + 2,
									ok.coursHeureTP.length
								);
								//console.log(endTime)
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
									ok1.getFullYear(),
									ok1.getMonth(),
									ok1.getDate(),
									hoursEnd,
									minutesEnd
								);
								//console.log(dateEnd)

								let eve = {
									summary: classes[i].name + ' ' + 'TP',
									description: 'Local: ' + ok.coursLocalTP,
									start: {
										dateTime: dateStart,
										timeZone: 'America/Toronto',
									},
									end: {
										dateTime: dateEnd,
										timeZone: 'America/Toronto',
									},
								};
								console.log(eve);
								events.push(eve);
								//ApiCalendar.createEvent(eve, "thks51mldef4rp7b7mt1icpvgo@group.calendar.google.com")
							} else {
								let alt = ok.coursHeureTP.substring(
									ok.coursHeureTP.indexOf('(') + 1,
									ok.coursHeureTP.length - 1
								);
								//console.log(alt)
								if (alt === day.alternance) {
									console.log('alternance');
									let startTime = ok.coursHeureTP.substr(
										0,
										ok.coursHeureTP.indexOf(',')
									);
									//console.log(startTime)
									let indexHourStart = startTime.indexOf('h');
									//console.log(indexHourStart, )
									let hoursStart = '';
									for (let o = 0; o < indexHourStart; o++) {
										//console.log(startTime[o])
										hoursStart = hoursStart + startTime[o];
									}
									let minuteStart = '';
									for (
										let o = indexHourStart + 1;
										o < startTime.length;
										o++
									) {
										//console.log(startTime[o])
										minuteStart =
											minuteStart + startTime[o];
									}
									//console.log(hoursStart, minuteStart)

									let dateStart = new Date(
										ok1.getFullYear(),
										ok1.getMonth(),
										ok1.getDate(),
										hoursStart,
										minuteStart
									);
									//console.log(dateStart)

									let endTime = ok.coursHeureTP.substr(
										ok.coursHeureTP.lastIndexOf(',') + 2,
										5
									);
									//console.log(endTime)
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
										ok1.getFullYear(),
										ok1.getMonth(),
										ok1.getDate(),
										hoursEnd,
										minutesEnd
									);
									//console.log(dateEnd)

									let eve = {
										summary: classes[i].name + ' ' + 'TP',
										description:
											'Local: ' +
											ok.coursLocalTP +
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
									console.log(eve);
									events.push(eve);
									//ApiCalendar.createEvent(eve, "thks51mldef4rp7b7mt1icpvgo@group.calendar.google.com")
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
	for (let index = 0; index < events.length; index++) {
		const element = events[index];
		try {
			const response = await backOff(() =>
				ApiCalendar.sendEvent(element)
			);
			return response;
		} catch (error) {
			console.log(error.message);
		}
	}
};

export default createEventsService;
