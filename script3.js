let level = 0;
let count = 0;
let profit = 0;
let startAmountValue = 0;
let reset = 9

let martin = []
const martin1 = [1000, 3000, 8000, 18000, 40000, 85000, 175000, 375000, 800000, 1600000];
const martin2 = [2000, 7000, 17000, 40000, 85000, 175000, 375000, 775000, 1600000, 3000000];
const martin3 = [3000, 10000, 25000, 55000, 125000, 250000, 525000, 1075000, 2200000, 3000000];

let markAmount = []
const markAmount1 = ["1000", "3000", "8000", "1.8k", "4k", "8.5k", "17.5k", "37.5k", "80k", "160k"];
const markAmount2 = ["2000", "7000", "1.7k", "4k", "8.5k", "17.5k", "37.5k", "77.5k", "160k", "300k"];
const markAmount3 = ["3000", "1k", "2.5k", "5.5k", "12.5k", "25k", "52.5k", "107.5", "220k", "300k"];

const gamePattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

gamePattern[0] = "";

const init = () => {
    newGame()
    nightMode()
}

const winProfit = () => {

    if(gamePattern[level] === 0){
        profit = profit + martin[0][level]
    } else {
        profit = profit + martin[0][level]*0.95
    }
    document.querySelector("#nowPrice").innerHTML = profit
    document.querySelector("#profit").innerHTML = profit - startAmountValue
}

const loseProfit = () => {

    if(gamePattern[level] === 0){
        profit = profit - martin[0][level]
    } else {
        profit = profit - martin[0][level]*0.95
    }
    document.querySelector("#nowPrice").innerHTML = profit
    document.querySelector("#profit").innerHTML = profit - startAmountValue
}

const levelAlert = () => {

    const nowLevel = document.querySelectorAll("#gamePatternBox > div")

    for(let i = 0; i < nowLevel.length; i ++) {
        nowLevel[i].classList.remove("active")
    }

    nowLevel[level].classList.add("active")
}

const countRound = () => {
    count++
    if(count === 50){
    document.querySelector("#allCount").classList.add("active")
    }
    document.querySelector("#allCount").innerHTML = count
}

const displayScreen = () => {
    document.querySelector("#bettingScreen").innerHTML = `${gamePattern[level] === 0 ? "플래이어" : "뱅커"} ${martin[0][level]}`
    document.querySelector("#bettingScreen").style.borderColor = gamePattern[level] === 0 ? "#3498db" : "#e74c3c";
    document.querySelector("#bettingScreen").style.color = gamePattern[level] === 0 ? "#3498db" : "#e74c3c";
}

const randomLogic = () => {

    gamePattern.map((item, index) => {
        gamePattern[index] = Math.round(Math.random())
    })
    
    let gameList = "";

    gamePattern.map((item, index) => {
        gameList += `<div class="${gamePattern[index] === 0 ? "플" : "뱅"}">${index+1}</div>`
    })
    
    displayScreen()
    document.querySelector("#gamePatternBox").innerHTML = gameList  

}

const logicReset = () => {
    level = 0
    randomLogic()
    levelAlert()
}

const newGame = () => {
    document.querySelector("#startingAmount").innerHTML = profit
    startAmountValue = profit
    document.querySelector("#profit").innerHTML = 0
    level = 0
    count = 0

    randomLogic()
    levelAlert()
    
    document.querySelector("#allCount").innerHTML = count
    document.querySelector("#allCount").classList.remove("active")
}

const winGame = () => {

    winProfit()
    level = 0
    randomLogic()
    countRound()
    levelAlert()
}

const loseGame = () => {

    loseProfit()

    if (level == reset){
        alert("리셋 단계에 도달했습니다 게임을 다시 시작합니다.")
        return logicReset()
    }

    level++

    displayScreen()
    countRound()
    levelAlert()

}

const tie = () => {

    countRound()

}

const nightMode = () => {

    document.querySelector("#nightMode").classList.toggle("active");
    document.querySelector("html").classList.toggle("dark");
    document.querySelector("#gameSet").classList.toggle("dark");
    document.querySelector("#gameMenu").classList.toggle("dark");
    document.querySelector("#cover").classList.toggle("dark");

}

const openSet = () => {
    document.querySelector("#cover").classList.add("active");
    document.querySelector("#priceInput").value = profit
}

const setOK = () => {

    document.querySelector("#cover").classList.remove("active");
    document.querySelector("#setCancle").classList.remove("set-btn");
    document.querySelector("#profit").innerHTML = 0

    startAmountValue = Number(document.querySelector("#priceInput").value)
    profit = Number(document.querySelector("#priceInput").value)
    document.querySelector("#startingAmount").innerHTML = startAmountValue
    reset = document.querySelector("#levelLimit").value

    martin = []
    markAmount = []

    if( martinSet.value == 1 ) {
        martin.push(martin1)
        markAmount.push(markAmount1)
    } else if ( martinSet.value == 2 ) {
        martin.push(martin2)
        markAmount.push(markAmount2)
    } else {
        martin.push(martin3)
        markAmount.push(markAmount3)
    }

    let markList = ""

    markAmount[0].map((item, index) => {
        markList += `<div class="markAmount">${item}</div>`
    })
    
    newGame()
    displayScreen()
    document.querySelector("#markAmountBox").innerHTML = markList  

}

const setCancle = () => {
    document.querySelector("#cover").classList.remove("active");
}

init()