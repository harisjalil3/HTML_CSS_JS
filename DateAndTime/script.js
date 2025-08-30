let stop = document.querySelector(".stop")
let start = document.querySelector(".start")
let reset = document.querySelector(".reset")
let displaytime = document.querySelector(".displaytime")
let displaydate = document.querySelector(".displaydate")

let timer_interval = null
let date_interval = null
let is_running = false
const now = new Date();

function update_timer() {

    let now=new Date()
    
    let hours = parseInt(displaytime.innerHTML=(now.getHours()));
    let minutes = parseInt(displaytime.innerHTML=(now.getMinutes()));
    let seconds = parseInt(displaytime.innerHTML=(now.getSeconds()));
    
    displaytime.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function update_date() {    
    let now=new Date()
    
    let date = parseInt(displaydate.innerHTML=(now.getDate()));
    let months = parseInt(displaydate.innerHTML=(now.getMonth())+1);
    let year = parseInt(displaydate.innerHTML=(now.getFullYear()));
    
    
    displaydate.innerHTML = `${date}/${months}/${year}`;
}

function start_timer() {
    if (is_running) return
    is_running = true
    timer_interval = setInterval(update_timer, 1000)
    date_interval = setInterval(update_date, 1000)
}


start_timer()