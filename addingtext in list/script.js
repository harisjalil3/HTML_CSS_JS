let input = document.querySelector(".input")
let list = document.querySelector(".list")
let btn = document.querySelector(".btn");
let rmv = document.querySelector(".rmv")

list.innerHTML = localStorage.getItem("list") || "";


function addingli() {
  let newli = document.createElement("li");
  newli.setAttribute("id","remove")
  newli.innerHTML = input.value
  
  list.appendChild(newli)

  localStorage.setItem("list", list.innerHTML)

  input.value = ""
  input.focus()
}

function clearall() {
  if (list.innerHTML==''){
    alert("List is empty")
  }
  else {
    let userconfirm=confirm("Do you want to Clear all tasks")
    if (userconfirm){
      list.innerHTML = "";
      localStorage.setItem("list", "");
  }
  }
}



// clear()
function main() {

  // delete the clicked <li>----------------
  list.addEventListener('click',(event) => {
    if (event.target.tagName === "LI") {
      event.target.remove(); 
    }
    localStorage.setItem("list", "");
  })
  
  // clearall on click ----------------------
  rmv.addEventListener('click', clearall)

  //clearall ono pressing del ---------------

  input.addEventListener("keydown", (event) => {
    if (event.key == "Delete") {
      clearall()
    }
  })

  // input added on pressing enter -----------
  input.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      addingli()
    }
  })
  // input added on click add -----------------

  btn.addEventListener("click", () => {
    addingli()
  })

}

main()