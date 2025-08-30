let stop = document.querySelector(".stop")
let start = document.querySelector(".start")
let reset = document.querySelector(".reset")
let display = document.querySelector(".display")

let timer_interval=null
let is_running=false

function update_timer() {
    const timeParts = display.innerHTML.split(":")
    let hours = parseInt(timeParts[0])
    let minutes = parseInt(timeParts[1])
    let seconds = parseInt(timeParts[2])

    seconds++
    if (seconds >= 60) {
        seconds = 0
        minutes++
    }

    if (minutes >= 60) {
        minutes = 0
        hours++
    }

    const formattedSeconds = seconds < 10 ? '0' +
        seconds : seconds
    const formattedMinutes = minutes < 10 ? '0' +
        minutes : minutes
    const formattedHours = hours < 10 ? '0' +
        hours : hours

    display.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
function reset_timer() {
    stop_timer()
    display.innerHTML = '00:00:00';
}
function start_timer() {
    if (is_running) return
    is_running = true
    timer_interval = setInterval(update_timer, 1000)
}
function stop_timer() {
    if (!is_running) return
    is_running = false
    clearInterval(timer_interval)
}

start.addEventListener('click',start_timer)
stop.addEventListener('click',stop_timer)
reset.addEventListener('click',reset_timer)