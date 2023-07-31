const board = document.querySelectorAll("td");

const crossbtn = document.getElementById("crossbtn");
const circlebtn = document.getElementById("circlebtn");

const resetbtn = document.getElementById("resetbtn");

const cross = document.querySelectorAll(".cross");
const circle = document.querySelectorAll(".circle");

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let empty = new Array(9).fill(true);
let playerX = true;
let enabled = true;
let rounds = 0;

let game = new Array(9).fill(0); // 0: empty, 1: cross, -1: circle
let finished = false;

cross.forEach((cro) => {
    const centerX = cro.width / 2;
    const centerY = cro.height / 2;
    const cav = cro.getContext("2d");
    cav.clearRect(0, 0, cro.width, cro.height);

    cav.translate(centerX, centerY);
    cav.rotate(Math.PI / 4);

    cav.strokeStyle = "hsl(210, 30%, 60%)";
    cav.lineWidth = 10;

    cav.beginPath();
    cav.moveTo(-40, 0);
    cav.lineTo(40, 0);
    cav.stroke();

    cav.beginPath();
    cav.moveTo(0, -40);
    cav.lineTo(0, 40);
    cav.stroke();
});

circle.forEach((cir) => {
    const centerX = cir.width / 2;
    const centerY = cir.height / 2;
    const cav = cir.getContext("2d");
    cav.clearRect(0, 0, cir.width, cir.height);

    cav.beginPath();
    cav.arc(centerX, centerY, 35, 0, Math.PI * 2);
    cav.arc(centerX, centerY, 32, 0, Math.PI * 2, true);
    cav.closePath();

    cav.strokeStyle = "hsl(210, 40%, 25%)";
    cav.fillStyle = "hsl(210, 40%, 25%)";
    cav.lineWidth = 10;

    cav.stroke();
    cav.fill();
});

circlebtn.addEventListener("click", () => {
    crossbtn.disabled = true;
    circlebtn.disabled = true;
    document.getElementById("hint").innerHTML = "Turn of &times;";

    setTimeout(() => {
        enabled = false;
        show(board[1], 1);
    }, 600);
});

crossbtn.addEventListener("click", () => {
    crossbtn.disabled = true;
    circlebtn.disabled = true;
    document.getElementById("hint").innerHTML = "Turn of &times;";
});

board.forEach((block, index) => {
    block.addEventListener("click", () => {
        crossbtn.disabled = true;
        circlebtn.disabled = true;
        if (empty[index] && enabled) {
            show(block, index);

            setTimeout(() => {
                position = algorithm();
                if (position != -1) {
                    show(board[position], position);
                }
                if (rounds == 9) {
                    showResult();
                }
            }, 600);
        }
    });

    block.addEventListener("mouseover", () => {
        if (empty[index]) {
            blockMouseover(block);
        }
    });

    block.addEventListener("mouseleave", () => {
        blockMouseleave(block);
    });
});

resetbtn.addEventListener("click", () => {
    board.forEach((block) => {
        block.querySelectorAll("canvas").forEach((cav) => {
            cav.style.display = "none";
        });
    });

    crossbtn.disabled = false;
    circlebtn.disabled = false;
    resetbtn.style.display = "none";
    empty.fill(true);
    playerX = true;
    rounds = 0;
    enabled = true;
    game.fill(0);
    finished = false;

    document.getElementById("hint").innerHTML = "Chose your turn &uparrow;";
});

function show(block, index) {
    if (playerX) {
        block.querySelector(".cross").style.display = "inline";
        document.getElementById("hint").innerHTML = "Turn of" + `<span style="margin-top: -5px; margin-left: 18px">o</span>`;
        game[index] = 1;
    } else {
        block.querySelector(".circle").style.display = "inline";
        document.getElementById("hint").innerHTML = "Turn of &times;";
        game[index] = -1;
    }
    block.style.backgroundColor = "hsl(210, 40%, 40%)";
    empty[index] = false;
    rounds += 1;
    enabled = !enabled;
    playerX = !playerX;
    showResult();

    if (finished || rounds == 9) {
        resetbtn.style.display = "inline";
    }
}

function blockMouseover(block) {
    block.style.backgroundColor = "hsl(210, 40%, 45%)";
}

function blockMouseleave(block) {
    block.style.backgroundColor = "hsl(210, 40%, 40%)";
}

function algorithm() {
    if (rounds == 9 || finished) {
        return -1;
    }

    let index;
    // do {
    // 	index = Math.floor(Math.random() * 9);
    // } while (empty[index] == false);

    let tmpO;

    switch (rounds) {
        case 1: // player: X, AI: O
            break;
        case 2: // player: O, AI: X
            tmpO = game.indexOf(-1);
            if (tmpO == 0 || tmpO == 2) {
                index = tmpO + 6;
            } else if (tmpO == 3 || tmpO == 5) {
                index = 4;
            } else if (tmpO == 4) {
                index = 0;
            } else if (tmpO == 6 || tmpO == 8) {
                index = tmpO - 6;
            } else {
                index = 6;
            }
            break;
        case 3:
            break;
        case 4:
            index = checkline(1);
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
            index = game.indexOf(0);
            break;
    }

    return index;
}

function showResult() {
    let tmp;
    for (const line of lines) {
        tmp = 0;
        for (let l = 0; l < 3; l++) {
            tmp += game[line[l]];
        }
        if (tmp == 3 || tmp == -3) {
            document.getElementById("hint").innerHTML = tmp > 0 ? "&times; win!" : `<span style="margin-top: -5px; margin-right: 18px;">o</span>` + " win!";
            finished = true;
            break;
        }
    }

    if (rounds == 9 && finished != true) {
        document.getElementById("hint").innerHTML = "Draw!";
    }

    if (finished || rounds == 9) {
        empty.fill(false);
    }
}

function checkline(s) {
    let index = -1;
    for (const line of lines) {
        tmp = 0;
        for (const l of line) {
            tmp += game[l];
        }
        if (tmp == 2 * s) {
            do {
                index = game.indexOf(0, index + 1);
            } while (!line.includes(index));

            return index;
        } else if (tmp == 2 * -s) {
            do {
                index = game.indexOf(0, index + 1);
            } while (!line.includes(index));

            return index;
        }
    }

    return index;
}
