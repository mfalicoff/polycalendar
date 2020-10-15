import axios from 'axios'

const createCalendar = (name) => {
    axios.post("https://www.googleapis.com/auth/calendar", {
        summary: "okokok"
    })
};

export default createCalendar