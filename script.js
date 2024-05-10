const gameBoard = document.querySelector(".board");
const form = document.querySelector(".board__form");
const input = document.querySelector(".board__input");
const startButton = document.querySelector(".board__btn");

const couple = {
    first: null,
    second: null,
    firstClickable: true,
    secondClickable: true,
}

let totalTime = 60;
let totalFlips = 0
let intervalId;

startButton.addEventListener("click", (event) => {
    event.preventDefault();
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
    startTimer()
});


function createBoard(columns, count) {
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
}

function createCard(flippedIcon) {
    const template = document.querySelector('#cardTemplate').cloneNode(true).content;
    const card = template.querySelector(".card");

    card.querySelector('#flippedIcon').classList.add(`fa-${flippedIcon}`)

    card.addEventListener("click", () => {
        gameLogic(card)
    })

    return card;
}

function createIconsArray(initialCount) {
    // Эта функция  должна вернуть перемешанный массив дублированных иконок
    const cardsIcons = [
        "compass", "cloud", "play", "bolt", "stop", "cogs",
        "atom", "basketball-ball", "arrows", "angle-left",
        "bars", "file", "filter", "gear", "folder", "folder-open",
        "shield", "scissors", "pen-clip"
    ];

    let cards = cardsIcons.slice(0, Math.floor(initialCount / 2))

    let duplicateCards = dublicateElements(cards);
    let duplicatedShuffledArr = shuffleArray(duplicateCards);

    return duplicatedShuffledArr;
};

function dublicateElements(array) {
    const arr = [];
    array.forEach((item) => {
        arr.push(item, item);
    })
    return arr;
}

function shuffleArray(array) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
        currentIndex--;

        const randomIndex = Math.floor(Math.random() * currentIndex);
        const temp = array[currentIndex];

        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }


    return array;
}

function isWin() {
    const gameTable = document.querySelector('.table');
    if (Array.from(gameTable.children).every((card) => card.classList.contains('flip'))) {
        setTimeout(() => {
            alert("You win!");
        }, 1000)
        clearInterval(intervalId)
    }
}

function startTimer() {
    const stateTime = document.querySelector(".header__time");
    const stateMoves = document.querySelector(".header__moves");

    intervalId = setInterval(() => {
        totalTime--;
        stateTime.innerText = `Time: ${totalTime}s`;
        stateMoves.innerText = `Steps: ${totalFlips}`;

        if (totalTime <= 0) {
            alert("Time is out!");
            clearInterval(intervalId)
        }
    }, 1000)
}

function gameLogic(card) {
    if (totalTime <= 0) {
        return;
    }
    // Если обе карточки не кликабельны, ничего не делаем
    if (!couple.firstClickable && !couple.secondClickable) return;

    // Переворачиваем карточку
    card.classList.add('flip');
    totalFlips++;

    // Проверяем, кликнута ли первая карточка
    if (couple.first === null) {
        // Если нет, то сохраняем на нее ссылку и считаем кликнутой
        couple.first = card;
        couple.firstClickable = false;
    }
    else if (couple.second === null && couple.first !== card) {
        // Если да, то проверяем, кликнута ли вторая карточка и не является ли вторая карточка той же самой карточкой,
        // что и первая, и если нет, то сохраняем ссылку на эту карточку и считаем ее кликнутой
        couple.second = card;
        couple.secondClickable = false;
    }

    // Если какой-либо карточки не кликнуто, ничего не делаем
    if (couple.first === null || couple.second === null) return;

    // Сравниваем классы двух карточек и сохраняем логический результат в переменную (это для повышения читабельности)
    const isEqual = couple.first.firstElementChild.classList[2] === couple.second.firstElementChild.classList[2];

    // Если классы одинаковы
    if (isEqual) {
        setTimeout(() => {
            // То перекрашиваем их в зеленый с задержкой в 1 секунду
            couple.first.classList.add('successfully');
            couple.second.classList.add('successfully');

            // Сбрасываем все ссылки и состояния
            refresh();
        }, 1000);
    } else {
        setTimeout(() => {
            // Иначе переворачиваем карточки обратно с задержкой в 1 секунду
            couple.first.classList.remove('flip');
            couple.second.classList.remove('flip');

            // Сбрасываем все ссылки и состояния
            refresh();
        }, 1000);
    }

    // Функция сброса ссылок и состояний
    function refresh() {
        couple.first = null;
        couple.second = null;
        couple.firstClickable = true;
        couple.secondClickable = true;
    }

    isWin()
}