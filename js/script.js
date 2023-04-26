// variables
const easy = 100;
const medium = 81;
const hard = 49;
const bombsNum = 16;
const main = document.querySelector("main");
const grid = document.querySelector(".grid");
let score = 0;
const result = document.createElement("div");
result.classList.add("result");

// functions
function play() {
    const mode = document.querySelector("#mode").value.toLowerCase();
    const cellNum = difficulty(mode);
    const bombsArr = [];

    //reset
    grid.innerHTML = "";
    result.innerHTML = "";

    //generator
    bombGenerator(bombsNum, 1, cellNum, bombsArr);
    cellGenerator(cellNum, main, grid, bombsArr, score, result);
    console.log(bombsArr);
}

function difficulty(diff) {
    return diff === "facile" ? easy
        : diff === "medio" ? medium
            : hard;
}

function cellGenerator(cells, main, grid, bombs, score, result) {
    for (let i = 1; i <= cells; i++) {
        const newCell = document.createElement("div");
        newCell.classList.add("cell");
        newCell.innerHTML = `${i}`;

        grid.appendChild(newCell);
        grid.style.setProperty("--sideSquare", Math.sqrt(cells));

        newCell.addEventListener('click', function () {
            this.classList.toggle('active');
            if (bombs.includes(i)) {
                result.innerHTML = `Hai perso! Punteggio: ${score}`;
                main.appendChild(result);
                score = 0
            } else {
                score++;
                if (score === (cells - bombsNum)) {
                    result.innerHTML = `Hai vinto! Punteggio: ${score}`;
                    main.appendChild(result);
                }
            }
        });
    }
}

function bombGenerator(range, min, max, arr) {
    let random;
    for (let i = 1; i <= range; i++) {
        do {
            random = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (arr.includes(random));
        arr.push(random);
    }
}