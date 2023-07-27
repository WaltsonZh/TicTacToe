const board = document.querySelectorAll("td");

const crossbtn = document.getElementById("crossbtn");
const circlebtn = document.getElementById("circlebtn");

const resetbtn = document.getElementById("resetbtn");

const cross = document.querySelectorAll(".cross");
const circle = document.querySelectorAll(".circle");

let empty = new Array(9).fill(false);
let playerX = true;

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
	circlebtn.style.disabled = true;
	document.getElementById("hint").innerHTML = "Turn of" + `<span style="margin-top: -5px; margin-left: 18px">o</span>`;
});

crossbtn.addEventListener("click", () => {
	playerX = true;
	crossbtn.style.disabled = true;
	document.getElementById("hint").innerHTML = "Turn of &times;";
});

board.forEach((block, index) => {
	block.addEventListener("click", () => {
		show(block, index);
	});
});

resetbtn.addEventListener("click", () => {
	board.forEach((block) => {
		block.querySelectorAll("canvas").forEach((cav) => {
			cav.style.display = "none";
		});
	});

	crossbtn.style.disabled = false;
	circlebtn.style.disabled = false;
	empty.fill(false);

	document.getElementById("hint").innerHTML = "Chose your turn &uparrow;";
});

function show(block, index) {
	if (playerX) {
		block.querySelector(".cross").style.display = "inline";
	} else {
		block.querySelector(".circle").style.display = "inline";
	}
	empty[index] = true;
}
