const board = document.querySelectorAll("td");

const crossbtn = document.getElementById("crossbtn");
const circlebtn = document.getElementById("circlebtn");

const resetbtn = document.getElementById("resetbtn");

const cross = document.querySelectorAll(".cross");
const circle = document.querySelectorAll(".circle");

let empty = new Array(9).fill(true);
let playerX = true;
let enabled = true;
let rounds = 0;

let game = new Array(9).fill(0); // 0: empty, 1: cross, 2: circle
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
	playerX = false;
	crossbtn.disabled = true;
	circlebtn.disabled = true;
	document.getElementById("hint").innerHTML = "Turn of" + `<span style="margin-top: -5px; margin-left: 18px">o</span>`;

	setTimeout(() => {
		enabled = false;
		show(board[0], 0);
	}, 600);
});

crossbtn.addEventListener("click", () => {
	playerX = true;
	crossbtn.disabled = true;
	circlebtn.disabled = true;
	document.getElementById("hint").innerHTML = "Turn of &times;";
});

board.forEach((block, index) => {
	block.addEventListener("click", () => {
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
		playerX = false;
	} else {
		block.querySelector(".circle").style.display = "inline";
		document.getElementById("hint").innerHTML = "Turn of &times;";
		game[index] = 2;
		playerX = true;
	}
	block.style.backgroundColor = "hsl(210, 40%, 40%)";
	empty[index] = false;
	rounds += 1;
	enabled = !enabled;
	showResult();
}

function blockMouseover(block) {
	block.style.backgroundColor = "hsl(210, 40%, 45%)";
}

function blockMouseleave(block) {
	block.style.backgroundColor = "hsl(210, 40%, 40%)";
}

function algorithm() {
	if (rounds >= 9 || finished) {
		return -1;
	}

	let index;
	do {
		index = Math.floor(Math.random() * 9);
	} while (empty[index] == false);

	return index;
}

function showResult() {
	for (let i = 0; i < 3; i++) {
		if (game[i * 3] == game[i * 3 + 1] && game[i * 3] == game[i * 3 + 2] && game[i * 3] != 0) {
			document.getElementById("hint").innerHTML = game[i * 3] == 1 ? "&times; win!" : `<span style="margin-top: -5px; margin-right: 18px;">o</span>` + " win!";
			finished = true;
		} else if (game[i] == game[i + 3] && game[i] == game[i + 6] && game[i] != 0) {
			document.getElementById("hint").innerHTML = game[i] == 1 ? "&times; win!" : `<span style="margin-top: -5px; margin-right: 18px;">o</span>` + " win!";
			finished = true;
		}
	}

	if ((game[0] == game[4] && game[4] == game[8] && game[4] != 0) || (game[2] == game[4] && game[4] == game[6] && game[4] != 0)) {
		document.getElementById("hint").innerHTML = game[4] == 1 ? "&times; win!" : `<span style="margin-top: -5px; margin-right: 18px;">o</span>` + " win!";
		finished = true;
	}

	if (rounds == 9 && finished != true) {
		document.getElementById("hint").innerHTML = "Draw!";
	}

	if (finished || rounds == 9) {
		empty.fill(false);
	}
}
