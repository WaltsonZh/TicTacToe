const board = document.querySelectorAll("td");

const crossbtn = document.getElementById("crossbtn");
const circlebtn = document.getElementById("circlebtn");

const reset = document.getElementById("restartbtn");
reset.style.display = "none";

const cross = document.querySelectorAll(".cross");
const circle = document.querySelectorAll(".circle");

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

	cro.style.display = "none";
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

	cav.strokeStyle = "hsl(210, 40%, 30%)";
	cav.fillStyle = "hsl(210, 40%, 30%)";
	cav.lineWidth = 10;

	cav.stroke();
	cav.fill();

	cir.style.display = "none";
});

circlebtn.addEventListener("click", () => {
	if (circle[0].style.display == "none") {
		circle.forEach((cir) => {
			cir.style.display = "inline";
		});
	} else {
		circle.forEach((cir) => {
			cir.style.display = "none";
		});
	}
});

crossbtn.addEventListener("click", () => {
	if (cross[0].style.display == "none") {
		cross.forEach((cro) => {
			cro.style.display = "inline";
		});
	} else {
		cross.forEach((cro) => {
			cro.style.display = "none";
		});
	}
});

function resetBoard() {
	board.forEach((grid) => {
		grid.textContent = "";
	});
}
