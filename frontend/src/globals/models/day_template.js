export default class DayTemplate {
    constructor(value, date, alternance) {
        this.alternance = alternance
        this.value = value;
        this.date = new Date(date)
    }
}