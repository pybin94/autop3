const pattern = {
    "1": ["A", "A", "A", "A", "A"],
    "2": ["A", "A", "A", "A", "B"],
    "3": ["A", "B", "A", "A", "A"],
    "4": ["A", "A", "B", "A", "A"],
    "5": ["A", "A", "B", "A", "B"],
    "6": ["A", "B", "A", "A", "B"],
    "7": ["A", "B", "B", "A", "B"],
    "8": ["A", "A", "B", "B", "A"],
    "9": ["B", "A", "A", "A", "A"],
    "10": ["B", "B", "A", "A", "A"],
    "11": ["B", "B", "B", "A", "A"],
    "12": ["B", "B", "B", "A", "B"],
    "13": ["B", "A", "B", "A", "B"],
    "14": ["B", "A", "A", "A", "B"],
    "15": ["B", "A", "A", "B", "B"],
    "16": ["B", "A", "B", "A", "A"],
    "17": ["B", "B", "B", "B", "B"],
    "18": ["B", "B", "B", "B", "A"],
    "19": ["B", "A", "B", "B", "B"],
    "20": ["B", "B", "A", "B", "B"],
    "21": ["B", "B", "A", "B", "A"],
    "22": ["B", "A", "B", "B", "A"],
    "23": ["B", "A", "A", "B", "A"],
    "24": ["B", "B", "A", "A", "B"],
    "25": ["A", "B", "B", "B", "B"],
    "26": ["A", "A", "B", "B", "B"],
    "27": ["A", "A", "A", "B", "B"],
    "28": ["A", "A", "A", "B", "A"],
    "29": ["A", "B", "A", "B", "A"],
    "30": ["A", "B", "B", "B", "A"],
    "31": ["A", "B", "B", "A", "A"],
    "32": ["A", "B", "A", "B", "B"],
}

let gameResultList = []
let gameBetting = []
let martin = []
let bottomList = []

const martin1 = [1000, 4000, 9000, 20000, 42000, 87000, 180000, 375000, 775000];
const martin2 = [2000, 8000, 18000, 40000, 85000, 175000, 360000, 750000, 1550000];
const martin3 = [3000, 12000, 27000, 60000, 125000, 260000, 540000, 1125000, 2325000];
const martin4 = [5000, 20000, 45000, 100000, 210000, 435000, 900000, 1875000, 3875000];
const martin5 = [10000, 40000, 90000, 200000, 420000, 870000, 1800000, 3750000, 7750000];

let level = 0;
let count = 0;
let profit = 0;
let startAmountValue = 0;
let reset = 8

const init = () => {
    newGame()
}

const bugTest = () => {
    console.log(martin[0][level])
    console.log(gameBetting.slice(-1)[0])
}

const arrayAdjust = () => {
    let i = 1
    while(i <= 32){
        if(gameResultList.slice(-5).toString() == pattern[i].toString()) {
            if(i <= 16) {
                document.querySelector("#bettingScreen").innerHTML = "플래이어"
                gameBetting = [...gameBetting, "A"]
            } else {
                document.querySelector("#bettingScreen").innerHTML = "뱅커"
                gameBetting = [...gameBetting, "B"]
            }
            break;
        }
        i++;
    }

    bottomList = [...bottomList, `<div class="${gameResultList.slice(-1)[0]}click bottom-ball"></div>`]
    console.log(bottomList)
    document.querySelector("#gamePatternBox").innerHTML = bottomList.slice(-5)
}


const winProfit = () => {
    if(gameResultList.slice(-1)[0] === "A"){
        profit = profit + martin[0][level]
    } else {
        profit = profit + martin[0][level]*0.95
    }

    let sumProfit = profit - startAmountValue

    document.querySelector("#nowPrice").innerHTML = profit.toLocaleString('ko-KR')
    document.querySelector("#profit").innerHTML = sumProfit.toLocaleString('ko-KR')
    level = 0;

}
const loseProfit = () => {

    profit = profit - martin[0][level]

    let sumProfit = profit - startAmountValue

    document.querySelector("#nowPrice").innerHTML = profit.toLocaleString('ko-KR')
    document.querySelector("#profit").innerHTML = sumProfit.toLocaleString('ko-KR')

    if(level == reset){
        alert("리셋 단계에 도달했습니다.")
        newGame()
    }
    level++
}

const countRound = () => {
    count++
    if(count === 50){
    document.querySelector("#allCount").classList.add("active")
    }
    document.querySelector("#allCount").innerHTML = count
}

const displayScreen = () => {
    let i = 1
    while(i <= 32){
        if(gameResultList.slice(-5).toString() == pattern[i].toString()) {
            document.querySelector("#bettingScreen").innerHTML = `${i <= 16 ? "플래이어" : "뱅커"} ${martin[0][level].toLocaleString('ko-KR')}`
            document.querySelector("#bettingScreen").style.borderColor = i <= 16 ? "#3498db" : "#e74c3c";
            document.querySelector("#bettingScreen").style.color = i <= 16 ? "#3498db" : "#e74c3c";
            break;
        }
        i++;
    }
   
}

const newGame = () => {
    document.querySelector("#startingAmount").innerHTML = profit.toLocaleString('ko-KR');
    startAmountValue = profit;
    document.querySelector("#profit").innerHTML = 0;
    level = 0;
    count = 0;
    gameResultList = [];
    gameBetting = [];
    bottomList = [];
    document.querySelector("#gamePatternBox").innerHTML = "";
    document.querySelector("#bettingScreen").innerHTML = "게임 결과를 입력해주세요.";
    document.querySelector("#bettingScreen").style.borderColor = "#c7c7c7";
    document.querySelector("#bettingScreen").style.color = "#333";
    document.querySelector("#allCount").innerHTML = count;
    document.querySelector("#allCount").classList.remove("active");
}

const player = () => {

    gameResultList = [ ...gameResultList, "A"]

    bugTest()

    if(gameResultList.length > 5) {
        if(gameBetting.slice(-1)[0] === "A"){
            winProfit()
            arrayAdjust()
        } else if (gameBetting.slice(-1)[0] === "B"){
            loseProfit()
            arrayAdjust()
        }
    } else {
        arrayAdjust()
    }

    displayScreen()
    countRound()
}

const banker = () => {

    gameResultList = [ ...gameResultList, "B"]
    bugTest()

    if(gameResultList.length > 5) {
        if(gameBetting.slice(-1)[0] === "B"){
            winProfit()
            arrayAdjust()
        } else if (gameBetting.slice(-1)[0] === "A"){
            loseProfit()
            arrayAdjust()
        }
    } else {
        arrayAdjust()
    }
    displayScreen()
    countRound()


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
    } else if ( martinSet.value == 2 ) {
        martin.push(martin2)
    } else {
        martin.push(martin3)
    }

    newGame()
    displayScreen() 

}

const setCancle = () => {
    document.querySelector("#cover").classList.remove("active");
}

init()