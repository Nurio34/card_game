
//todo : Melodi ekle
//todo : Log ve Sign form oluştur(Sadece nick)
//todo : Log veya Sign yaptıktan sonra oyun ekranına geçiş yap
//todo : En iyiler listesi oluştur

const totalCards = 8
const arr = []

    for(i=1; i<=totalCards; i++) {
        const card = `
            <li class="card">
                <div class="view front"><img src="./image/img-${i}.png" alt=""></div>
                <div class="view back">?</div>
            </li>
    `
        arr.push(card)
        arr.push(card)
    }

const table = document.querySelector("ul.container")
const startBtns = document.querySelectorAll("button.start")
const restartBtn = document.querySelector("button.restart")

let cardPairs = []
let chosenCardPairs = []
let timesMade = []
let bestTime = 0
let clickable = false
let isStarted = false
startBtns[1].disabled = true
restartBtn.disabled = true 
let timerInterval
let foundPairs = 0


    startBtns.forEach(startBtn=> {

        startBtn.addEventListener("click",()=>{

            if(!isStarted) {
                clickable = true
                isStarted = true
                restartBtn.disabled = false
                shuffleCards()
            }
        })
    })
    
    
    restartBtn.addEventListener("click",()=> {
        foundPairs = 0
        clickable = true
        cardPairs = []
        chosenCardPairs = []
        clearInterval(timerInterval)
        shuffleCards()
        
    })



function shuffleCards() {
    startBtns[1].disabled = false

    table.innerHTML = ""

        arr.sort(()=> Math.random()<0.5 ? 1 : -1).forEach(i=> table.innerHTML+=i)

    const cards = document.querySelectorAll("li.card")

        cards.forEach(card=> card.addEventListener("click", e=>{

            if(clickable) {
                flipCard(e)
                getDataofTwoCards(e)
            }
        }))

        startTime()
}

function startTime() {
    const timeStarted = new Date().getMilliseconds()
    const timerEl = document.querySelector(".options .timer span")
    let sec = 0

    timerInterval = setInterval(() => {
        const currentTime =new Date().getMilliseconds()
        if(currentTime >= 900) sec++
           timerEl.innerText = sec + "." + currentTime
    }, 101);
}

function flipCard(e) {
    const card = e.target
        card.classList.add("flip")
}

function getDataofTwoCards(e) {

    const card = e.target
        cardPairs.push(card)
        card.style = "pointer-events:none"
        
    const chosenCard = card.querySelector("img")
        chosenCardPairs.push(chosenCard.src)

        if(cardPairs.length === 2) {

            checkPairs(cardPairs,chosenCardPairs)
            clickable = false
        } 
}

function checkPairs(arr1,arr2) {

    if(arr2[0] === arr2[1]) {
        foundPairs ++
    } 

    else {

        arr1.forEach(el=>setTimeout(() => {

            el.classList.remove("flip")
            arr1.forEach(el=>el.style="pointer-events:all")
        }, 1000))
    }

    if(foundPairs === 8) {

        stopTime()
        restartBtn.disabled = true

        setTimeout(() => {

            const cards = document.querySelectorAll("li.card")

                cards.forEach(card=> {
                    card.classList.remove("flip")
                    card.style = "pointer-events : all"
                })

            foundPairs = 0
            
            setTimeout(() => {
                isStarted = false
                startBtns[1].classList.add("canStart")
                clickable = false
            }, 1000);
        }, 2000);
    }

    setTimeout(() => {
        clickable = true
    }, 1000);

cardPairs = []
chosenCardPairs = []

} 

function stopTime() {
    clearInterval(timerInterval)
    const timerEl = document.querySelector(".options .timer span")
    const bestTimeEl = document.querySelector(".options .bestTime span")
    const timeMade = +timerEl.innerText

        timesMade.push(timeMade)
        bestTime = timesMade[0]

        if(timesMade.length >= 2) {

            timesMade = timesMade.sort((a,b)=>a-b)
            bestTime = timesMade[0]
            timesMade.length = 2
        }
    
            bestTimeEl.innerText = bestTime
}
