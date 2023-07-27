const board = document.querySelectorAll("td");

const reset = document.getElementById("restartbtn");
reset.style.display = "none";

const cross = document.querySelectorAll(".cross");
const circle = document.querySelectorAll(".circle");

const outRadius = 40;
const inRadius = 35;

// cross.forEach((cro) => {
// 	const centerX = cro.width / 2;
// 	const centerY = cro.height / 2;
// 	const cav = cro.getContext("2d");
// 	cav.clearRect(0, 0, cro.width, cir.height);

// 	cav.translate(centerX, centerY);
// 	cav.rotate(Math.PI / 4);

// 	cav.strokeStyle = "black";
// 	cav.lineWidth = 2;

// 	cav.beginPath();
// 	cav.moveTo(-25, 0);
// 	cav.lineTo(25, 0);
// 	cav.stroke();

// 	cav.beginPath();
// 	cav.moveTo(0, -25);
// 	cav.lineTo(0, 25);
// 	cav.stroke();

// 	cav.setTransform(1, 0, 0, 1, 0, 0);
// });

circle.forEach((cir) => {
	const centerX = cir.width / 2;
	const centerY = cir.height / 2;
	const cav = cir.getContext("2d");
	cav.clearRect(0, 0, cir.width, cir.height);

	cav.beginPath();
	cav.arc(centerX, centerY, outRadius, 0, Math.PI * 2);
	cav.arc(centerX, centerY, inRadius, 0, Math.PI * 2, true);
	cav.closePath();

	cav.strokeStyle = "hsl(210, 40%, 30%)";
	cav.fillStyle = "hsl(210, 40%, 30%)";
	cav.lineWidth = 10;

	cav.stroke();
	cav.fill();

	cir.style.display = "none";
});

function resetBoard() {
	board.forEach((grid) => {
		grid.textContent = "";
	});
}
