let addDay = function (date, timeToAdd) {
	if (date) {
		let dateMillis = date.getTime();

		//JavaScript doesn't have a "time period" object, so I'm assuming you get it as a string
		let timePeriod = `${24 * timeToAdd}:00:00`; //I assume this is 15 minutes, so the format is HH:MM:SS

		let parts = timePeriod.split(/:/);
		let timePeriodMillis =
			parseInt(parts[0], 10) * 60 * 60 * 1000 +
			parseInt(parts[1], 10) * 60 * 1000 +
			parseInt(parts[2], 10) * 1000;

		let newDate = new Date();
		newDate.setTime(dateMillis + timePeriodMillis);
		return newDate;
	}
};

export default addDay;
