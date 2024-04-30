export function setExpirationDate() {
    const currentDate = new Date();
    const minFuture = addMinutes(currentDate,30);
    const futureDateDays = addDays(currentDate,3);  
    const dateInput = document.querySelector("input[type=datetime-local]");
    dateInput.min = getDateTimeLocalString(minFuture);
    dateInput.value = getDateTimeLocalString(futureDateDays);
    dateInput.addEventListener("input", updateUI);
}

function getDateTimeLocalString(date) {
    const result = new Date(date);
    const [year, month, day, hour, minutes] = [
        result.getFullYear(),
        String(result.getMonth() + 1).padStart(2,"0"),
        String(result.getDate()).padStart(2,"0"),
        String(result.getHours()).padStart(2,"0"),
        String(result.getMinutes()).padStart(2,"0")
    ];
    return `${year}-${month}-${day}T${hour}:${minutes}`;
}

function addDays(date,days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days);
    return result;
}

function addHours(date,hours) {
    const result = new Date(date)
    result.setHours(result.getHours() + hours);
    return result;
}
function addMinutes(date,minutes) {
    const result = new Date(date)
    result.setMinutes(result.getMinutes() + minutes);
    return result;
}

function updateUI() {
    const selectedDate = new Date(this.value);
    const [days,hours,minutes] = timePassed(selectedDate);
    document.querySelector("#expiration-days").textContent = days;
    document.querySelector("#expiration-hours").textContent = hours;
    document.querySelector("#expiration-minutes").textContent = minutes;    
}

function timePassed(date) {
    const currentDate = new Date();
    const timeDifference = date.getTime() - currentDate.getTime();
    if (timeDifference < 0) return [0,0,0];
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return [days,hours,minutes];
}