let add = document.querySelector(".add")
let sub = document.querySelector(".sub")
let number = document.querySelector(".number")
let cooler = document.querySelector(".cooler")


add.addEventListener('click', () => {
  let current = parseInt(number.textContent) || 0;
  let step = parseInt(cooler.textContent) || 1; // default to 1
  number.textContent = current + step;
});

sub.addEventListener('click', () => {
  let current = parseInt(number.textContent) || 0;
  let step = parseInt(cooler.textContent) || 1;
  number.textContent = current - step;
});

