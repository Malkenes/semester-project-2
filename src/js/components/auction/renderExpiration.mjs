export function renderCountDown(endsAt) {
    const [days,hours,minutes,seconds] = timePassed(endsAt);
    return `
        <div class="d-flex gap-1 text-center">
            <div class="p-2 bg-white bg-primary bg-opacity-25 rect">
                <div>${hours}</div>
                <span>Hours</span>
            </div>
            <div class="p-2 bg-white bg-primary bg-opacity-25 rect">
                <div>${minutes}</div>
                <span>Min</span>
            </div>
            <div class="p-2 bg-white bg-primary bg-opacity-25 rect">
                <div>${seconds}</div>
                <span>Sec</span>
            </div>
        </div>
        `    
}
export function renderExpiration(endsAt) {
    const expirationHTML = `<div class="bg-white bg-primary bg-opacity-25 d-flex align-items-center justify-content-center p-3">`
    const currentDate = new Date();
    const [days,hours,minutes,seconds] = timePassed(endsAt);
    if (currentDate.getTime() > endsAt.getTime()) {
        return `${expirationHTML}<b>Expired</b></div>`;
    } else if (days > 0) {
        if (days === 1) {
            return `${expirationHTML}${days} day</div>`;
        } else {
            return `${expirationHTML}${days} days</div>`;
        }
    } else {
        return renderCountDown(endsAt);
    }
}
function timePassed(date) {
    const currentDate = new Date();
    const timeDifference = date.getTime() - currentDate.getTime();
    if (timeDifference < 0) return [0,0,0,0];
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / (1000));

    return [days,hours,minutes,seconds];
}