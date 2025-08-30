const cardArray = [
    {
        name: "fries",
        img: "images/fries.png"
    },
    {
        name: "cheeseburder",
        img: "images/cheeseburger.png"
    },
    {
        name: "hotdog",
        img: "images/hotdog.png"
    },
    {
        name: "ice-cream",
        img: "images/ice-cream.png"
    },
    {
        name: "pizza",
        img: "images/pizza.png"
    },
    {
        name: "milkshake",
        img: "images/milkshake.png"
    },
    {
        name: "fries",
        img: "images/fries.png"
    },
    {
        name: "cheeseburder",
        img: "images/cheeseburger.png"
    },
    {
        name: "hotdog",
        img: "images/hotdog.png"
    },
    {
        name: "ice-cream",
        img: "images/ice-cream.png"
    },
    {
        name: "pizza",
        img: "images/pizza.png"
    },
    {
        name: "milkshake",
        img: "images/milkshake.png"
    },

]


// console.log(cardArray);

// sort array randomly
cardArray.sort(() => 0.5 - Math.random())



const gridDisplay = document.querySelector("#grid")
const resultDisplay = document.querySelector("#result")
let cardChoosen = []
const cardChoosenIds = []
const cardsWon = []

// console.log(gridDisplay);

function creatborad() {

    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement("img");
        card.setAttribute("src", `images/blank.png`)
        card.setAttribute("data-id", i)
        card.addEventListener('click', flipcard)
        // console.log(card,i+1);
        gridDisplay.appendChild(card)
    }

}

creatborad()



function checkmatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardChoosenIds[0]
    const optionTwoId = cardChoosenIds[1]
    console.log(cards);
    console.log("check for match")

    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute("src", "images/blank.png")
        cards[optionTwoId].setAttribute("src", "images/blank.png")
        alert('you have click the same image');
    }
    if (cardChoosen[0] == cardChoosen[1]) {
        alert("you found a match")
        cards[optionOneId].setAttribute("src", "images/white.png")
        cards[optionTwoId].setAttribute("src", "images/white.png")
        cards[optionOneId].removeEventListener("click", flipcard)
        cards[optionTwoId].removeEventListener("click", flipcard)
        cardsWon.push(cardChoosen)
    } else {
        cards[optionOneId].setAttribute("src", "images/white.png")
        cards[optionTwoId].setAttribute("src", "images/white.png")
        alert('try again');

    }
    resultDisplay.textContent = cardsWon.length

    cardChoosen = []
    cardChoosenIds = []
    if (cardsWon.length == cardArray.length / 2) {
        resultDisplay.textContent = cardsWon.length
    }
}

function flipcard() {
    const cardId = this.getAttribute("data-id")
    cardChoosen.push(cardArray[cardId].name)
    cardChoosenIds.push(cardId)
    console.log(cardChoosen);
    console.log(cardChoosenIds);
    this.setAttribute('src', cardArray[cardId].img)
    if (cardChoosenIds.length === 2) {
        setTimeout(checkmatch, 500);
    }
}