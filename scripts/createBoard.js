import { createIconsArray, createCard } from "./cards.js";
import { startTimer } from "./timer.js";

const gameBoard = document.querySelector(".board");

export function createBoard(columns, count) {
    gameBoard.textContent = ""

    const template = document.querySelector('#gameTableTemplate').cloneNode(true).content;
    const gameTable = template.querySelector(".table");
    const restartBtn = template.querySelector(".table__button");

    gameTable.style = `grid-template-columns: repeat(${columns}, 1fr); grid-template-rows: repeat(${columns}, 1fr);`

    gameBoard.append(gameTable);

    restartBtn.addEventListener("click", () => {
        location.reload();
    })

    gameBoard.append(restartBtn);

    let icons = createIconsArray(count)

    icons.forEach((icon) => {
        gameTable.append(createCard(icon));
    })

    startTimer()
}