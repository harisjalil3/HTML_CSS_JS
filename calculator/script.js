let string = ""
let buttons = document.querySelectorAll(".button")

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.innerText == '=') {
            string = eval(string)
            document.querySelector(".display").innerText = string
        } else if (e.target.innerText == 'AC') {
            string = " "
            document.querySelector(".display").innerText = string
        } else {
            string = string + e.target.innerText;
            console.log(string)
            document.querySelector(".display").innerText = string
        }
    })
})