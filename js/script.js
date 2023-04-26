// variables
const easy = 100;
const medium = 81;
const hard = 49;
const grid = document.querySelector(".grid");

// functions
function play() {
    const mode = document.querySelector("#mode").value.toLowerCase();
    const cellNumber = difficulty(mode);
    grid.innerHTML = "";
    generate(cellNumber, grid);
}

function difficulty(diff) {
    return diff === "facile" ? easy
        : diff === "medio" ? medium
            : hard;
}

function generate(cells, grid) {
    for (let i = 1; i <= cells; i++) {
        const newCell = document.createElement("div");
        newCell.classList.add("cell");
        newCell.innerHTML = `${i}`;

        grid.appendChild(newCell);
        grid.style.setProperty("--sideSquare", Math.sqrt(cells));

        newCell.addEventListener('click', function () {
            this.classList.toggle('active');
            console.log(`Hai premuto la cella ${this.innerHTML}`);
        });
    }
}