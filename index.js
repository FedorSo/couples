import { createBoard } from "./scripts/createBoard.js";
import { startTimer } from "./scripts/timer.js";

const startButton = document.querySelector(".board__btn");

startButton.addEventListener("click", (event) => {
    event.preventDefault();
    const input = document.querySelector(".board__input");

    let columns = input.value;
    let count;

    if (columns >= 2 && columns <= 6 && columns % 2 == 0) {
        count = columns * columns;
    }
    else {
        input.value = 4;
        return;
    }
    createBoard(columns, count);
});