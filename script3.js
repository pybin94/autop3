let level = 0;
let count = 0;
let profit = 0;
let startAmountValue = 0;
let reset = 22
let multiWin = false;

let martin = []
const martin1 = [1000, 3000, 8000, 18000, 40000, 32000, 64000, 43000, 86000, 60000, 120000, 83000, 166000, 115000, 230000, 157000, 314000, 215000, 430000, 300000, 600000, 420000, 840000];
const martin2 = [2000, 7000, 17000, 40000, 85000, 63000, 126000, 87000, 174000, 120000, 240000, 165000, 330000, 225000, 450000, 310000, 620000, 420000, 840000, 570000, 1140000, 780000, 1560000];
const martin3 = [3000, 10000, 25000, 55000, 125000, 95000, 190000, 135000, 270000, 185000, 370000, 255000, 510000, 350000, 700000, 475000, 950000, 650000, 1300000, 880000, 1760000, 1200000, 2400000];

let markAmount = []
const markAmount1 = ["1000", "3000", "8000", "1.8k", "4k", "8.5k", "17.5k", "37.5k", "80k", "160k"];
const markAmount2 = ["2000", "7000", "1.7k", "4k", "8.5k", "17.5k", "37.5k", "77.5k", "160k", "300k"];
const markAmount3 = ["3000", "1k", "2.5k", "5.5k", "12.5k", "25k", "52.5k", "107.5", "220k", "300k"];

const gamePattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// gamePattern[0] = 0;

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

    let sumProfit = profit - startAmountValue

    document.querySelector("#nowPrice").innerHTML = profit.toLocaleString('ko-KR')
    document.querySelector("#profit").innerHTML = sumProfit.toLocaleString('ko-KR')

}
const loseProfit = () => {

    if(gamePattern[level] === 0){
        profit = profit - martin[0][level]
    } else {
        profit = profit - martin[0][level]
    }

    let sumProfit = profit - startAmountValue

    document.querySelector("#nowPrice").innerHTML = profit.toLocaleString('ko-KR')
    document.querySelector("#profit").innerHTML = sumProfit.toLocaleString('ko-KR')

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
    document.querySelector("#bettingScreen").innerHTML = `${gamePattern[level] === 0 ? "플래이어" : "뱅커"} ${martin[0][level].toLocaleString('ko-KR')}`
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
    document.querySelector("#startingAmount").innerHTML = profit.toLocaleString('ko-KR')
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

    if(level < 5) {
        winProfit()
        level = 0
        randomLogic()
        countRound()
        levelAlert()
    } else if (level >= 5 && multiWin == false){
        winProfit()
        level++
        multiWin = true;
        randomLogic()
        countRound()
        levelAlert()
        console.log(multiWin)

    } else if (level >= 5 && multiWin == true) {
        winProfit()
        multiWin = false
        level = 0
        randomLogic()
        countRound()
        levelAlert()
    }

}

const loseGame = () => {

    loseProfit()
    randomLogic()

    multiWin = false;

    if (level == reset){
        alert("리셋 단계에 도달했습니다 게임을 다시 시작합니다.")
        return logicReset()
    }
    level++

    console.log(level)
    console.log(reset)

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

    // markAmount[0].map((item, index) => {
    //     markList += `<div class="markAmount">${item}</div>`
    // })
    
    newGame()
    displayScreen()
    document.querySelector("#markAmountBox").innerHTML = markList  

}

const setCancle = () => {
    document.querySelector("#cover").classList.remove("active");
}

init()
