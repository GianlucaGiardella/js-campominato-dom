// VARIABLES

const easy = 100;
const medium = 81;
const hard = 49;

const bombsNum = 16;
let bombsArr = [];

let totalCells;
let score = 0;

const main = document.querySelector("main");
const grid = document.querySelector(".grid");
const result = document.createElement("div");
result.classList.add("result");



// FUNCTIONS

function play() {
    // Difficulty selection
    const mode = document.querySelector("#mode").value.toLowerCase();
    totalCells = difficulty(mode);

    // Reset grid & result
    grid.innerHTML = "";
    result.innerHTML = "";

    // Array whit random bombs
    bombsArr = bombGenerator(bombsNum, 1, totalCells);
    cellGenerator(totalCells, grid);

}

// Set difficulty
function difficulty(diff) {
    return diff === "facile" ? easy
        : diff === "medio" ? medium
            : hard;
}

// Generate random bombs array
function bombGenerator(range, min, max) {
    let bombsArr = [];

    for (let i = 1; i <= range; i++) {
        let random;
        do {
            random = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (bombsArr.includes(random));
        bombsArr.push(random);
    }

    console.log(bombsArr);
    return bombsArr;
}

// Generate cells & bombs
function cellGenerator(cells, grid) {
    for (let i = 1; i <= cells; i++) {
        // Create a new cell whit class & number
        const newCell = document.createElement("div");
        newCell.classList.add("cell");
        newCell.innerHTML = `${i}`;

        // Append in html and set style
        grid.appendChild(newCell);
        grid.style.setProperty("--sideSquare", Math.sqrt(cells));

        // Click listener
        newCell.addEventListener('click', activation);
    }
}

// Remove listener & set if bombs exists
function activation() {
    const numCell = parseInt(this.innerHTML);
    this.removeEventListener('click', activation);

    if (bombsArr.includes(numCell)) {
        this.classList.add('bomb');
        showAll(true);
        result.innerHTML = `Hai vinto! Punteggio: ${score}`;
        main.appendChild(result);
    } else {
        score++;
        this.classList.add('active');
        if (totalCells - score === bombsNum) {
            showAll(false);
            result.innerHTML = `Hai vinto! Punteggio: ${score}`;
            main.appendChild(result);
        }
    }
}

// Remove all cells listener & reveal bombs
function showAll(end) {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', activation);
        const numCell = parseInt(cells[i].innerHTML);
        end && bombsArr.includes(numCell) ? cells[i].classList.add('bomb') : '';
    }
}
