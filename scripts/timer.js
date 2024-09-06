import { totalFlips, startConfetti } from "./gameLogic.js"

let totalTime = 60;
let intervalId;


function isWin() {
    const gameTable = document.querySelector('.table');
    if (Array.from(gameTable.children).every((card) => card.classList.contains('flip'))) {
        setTimeout(() => {
            alert("You win!");
        }, 1000)
        clearInterval(intervalId);
        startConfetti()
    }
}

function startTimer() {
    const stateTime = document.querySelector(".header__time");
    const stateMoves = document.querySelector(".header__moves");

    intervalId = setInterval(() => {
        totalTime--;
        stateTime.innerText = `Time: ${totalTime}s`;
        stateMoves.innerText = `Steps: ${totalFlips}`;

        if (totalTime === 0) {
            alert("Time is out!");
            console.log("Time is out!");
            clearInterval(intervalId)
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(intervalId)
}

export { startTimer, stopTimer, isWin, totalTime }