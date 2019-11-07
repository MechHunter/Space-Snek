
/* TO DO List:
Restart game if player hits the edges or stop the player's movements - DONE
add space fruit for the player to eat - DONE
add asteroids that kill the player if they hit the "head" - DONE
add text for while the player isn't playing "Press Start" - DONE
add different dificulties - DONE
add a score counter - DONE
add a player name thingy - DONE
make it so that the game fully resets upon death or winning -
add respawn protection that dissapears upon moving -
add a winning goal -
make it so the snake gets longer the more it eats -
kill the player if they hit themselves -
add sprites -
make it so that when the canvas is clicked on it focuses -
add leaderboards -
fix the game getting faster on multiple mouse clicks -
fix the webiste scrolling when an arrow key is pressed -
fix asteroids flashing -
clean up js -
*/


var canvas = document.getElementById('game');
// canvas
var ctx = canvas.getContext('2d');
// context
var start = false;
// if the game has started
var score = 0;
// player's score
var astTimer = 0;
// the spawn timer for the asteroids, constantly counts up
var allAsts = [];
// all the asteroids are stored here (it's cleared once there are more then 5 asteroids in it)
var everyAst = [allAsts];
var lives = 3;
// how many lives the player has before they die
var difScoreGoal;
// the score the player needs to win
var dif;
var difficulty;
var difColor;
// the difficulty and it's attributes
var timeSurv = 0;
// how long the player has survived without hitting an ast or the boarder
var snakeSpeed;
// the snake's speed (is changed with the dumb difficulties)
var astCount;
// the number of asts that can be loaded at once
var playerName = prompt("Enter a username");
// asks for the player to enter a name
console.log("Space Snek Version 3.0");
// the version of the game

function checkName() {
	if (playerName == undefined) {
		playerName = "JonnyNoName";
	}
}
checkName();

var gameArea = {
	// the red boarder
	draw: function(){
		//draws it
		ctx.strokeStyle = 'red';
		ctx.rect(19, 19, 761, 561);
		ctx.lineWidth = 2;
		ctx.stroke();
	}
};


var snakeSize = 20;
// the snake's size
var snake = {
	// the snake

	x: 415-snakeSize/2,
	// the snake's x co-ord
	y: 310-snakeSize/2,
	// the snake's y co-ord
	speedX: 0,
	// the snake's x speed
	speedY: 0,
	// the snake's y speed
	radius: 10,
	// the snake's radius

	draw: function() {
		//draws the snake
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius ,0 , 2*Math.PI);
		ctx.fillStyle = 'lime';
		ctx.fill();
		ctx.closePath();
	},

	move: function() {
		//moves the snake
		this.x = this.x + this.speedX;
		this.y = this.y + this.speedY;
	}
};


var fruitSize = 13;
// the size of the fruit
var spaceFruit = {
	// the space fruit

	x: Math.floor(Math.random()*800)-fruitSize/2,
	// space fruit's x co-ord
	y: Math.floor(Math.random()*600)-fruitSize/2,
	// space fruit's y co-ord
	radius: 7.5,
	// space fruit's radius

	draw: function() {
		// draws the space fruit
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius ,0 , 2*Math.PI);
		ctx.fillStyle = 'cyan';
		ctx.fill();
		ctx.closePath();
	}
};


var playerNameTextStart = {

	draw: function() {
		ctx.fillStyle = 'yellow';
		ctx.font = "30px Impact";
		ctx.fillText("Welcome " + playerName, 20, 40);
	}
}


var playerNameText = {

	draw: function() {
		ctx.fillStyle = 'yellow';
		ctx.font = "30px Impact";
		ctx.fillText(":" + playerName, 530, 30);
	}
}


var difText = {

	draw: function() {
		ctx.fillStyle = difColor;
		ctx.font = "30px Impact";
		ctx.fillText("Difficulty: " + difficulty, 520, 570);
	}
}


var scoreText = {
// the text for the player's score

draw: function() {
	// draws text
	ctx.fillStyle = 'cyan';
	ctx.font = "40px Impact";
	ctx.fillText("Score: " + score, 340, 40);
	}
}


var livesText = {
	// the text for the player's lives

	draw: function() {
		//draws text
		if (lives === 1) {
			ctx.fillStyle = 'red';
			ctx.font = "35px Impact";
			ctx.fillText("Lives: " + lives, 220, 35);
		}
		else {
			ctx.strokeStyle = 'white';
			ctx.font = "30px Impact";
			ctx.strokeText("Lives: " + lives, 240, 30);
		}
	}
}


var TimeSurvText = {
	// the text for how long the player has survived without dying

	draw: function() {
		// draws text
		ctx.strokeStyle = 'white';
		ctx.font = "30px Impact";
		ctx.strokeText("Time Survived: " + timeSurv, 10, 585);
	}
}


var astSize = 10;
// the size of the asteroids
function Ast(x, y, speedX, speedY, radius) {
	// object constructor for the asteroids

	this.x = x;
	// the asteroids' x co-ord
	this.y = y;
	// the asteroids' y co-ord
	this.speedX = speedX;
	// it's speed x
	this.speedY = speedY;
	// it's speed y
	this.radius = radius;
	// it's radius

	this.draw = function() {
		// draws the asteroids
		ctx.strokeStyle = 'red';
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius ,0 , 2*Math.PI);
		ctx.lineWidth = 4;
		ctx.stroke();
	};

	this.move = function() {
		// moves the asteroids
		this.x = this.x + this.speedX;
		this.y = this.y + this.speedY;
	};
}

function getDistance(x1, y1, x2, y2){
	// gets distance between two points
	// the collision detection stuff i got from here > https://www.youtube.com/watch?v=XYzA_kPWyJ8 <

	var xDistance = x2 - x1;
	var yDistance = y2 - y1;

	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}


function isStart(){
	// if the player has or hasn't started

	var textStart = {
	// the "press start" text

	draw: function(){
		// draws it
		ctx.fillStyle = 'green';
		ctx.font = "70px Impact";
		ctx.fillText("Press Start", 240, 330);
		}
	}
	if (start == false){
		// if the player hasn't started the game, it daws the text

		ctx.clearRect(0,0,canvas.width,canvas.height);
		textStart.draw();
		playerNameTextStart.draw();
	}
}
isStart();
// calls it


function spaceFruitCheck(){
	// checks if the fruit has spawned out side of the bounderies, if so then it repositions the fruit

	if (spaceFruit.x >= 720 || spaceFruit.x <= 60){
		// for x

		spaceFruit.x = Math.floor(Math.random()*800)-fruitSize/2;
		spaceFruit.y = Math.floor(Math.random()*600)-fruitSize/2;
		console.log("Fruit replaced");
	}
		else if (spaceFruit.y >= 520 || spaceFruit.y <= 60){
		// for y

		spaceFruit.x = Math.floor(Math.random()*800)-fruitSize/2;
		spaceFruit.y = Math.floor(Math.random()*600)-fruitSize/2;
		console.log("Fruit replaced");
	}
}


function eatenFruitCheck() {
	// collision detection for if the snake eats the fruit
	// once again i got the collision detection stuff i got from here > https://www.youtube.com/watch?v=XYzA_kPWyJ8 <

	if (getDistance(spaceFruit.x, spaceFruit.y, snake.x, snake.y) < snake.radius + spaceFruit.radius){
		// if the distance between the snake's x and y co-ords and the fruit's x and y co-ords is less then
		// the radius of both the snake and the fruit then they have collided

		spaceFruit.x = Math.floor(Math.random()*800)-fruitSize/2;
		spaceFruit.y = Math.floor(Math.random()*600)-fruitSize/2;
		console.log("space fruit eaten");
		score = score + 1;
		// adds more to the score and repositions the fruit
	}
}


function snakeBoundryCheck(){
	// checks if the snake has hit the boarder

	if (snake.x >= 780 || snake.x <= 20){

		ctx.clearRect(0,0,canvas.width,canvas.height);
		snake.x = 415-snakeSize/2;
		snake.y = 310-snakeSize/2;
		snake.speedX = 0;
		console.log("snake died x");
		lives = lives - 1;
		timeSurv = 0;
	// if it has then it resets the snakes pos, speed, time survived and removes a life
	}
	else if (snake.y >= 580 || snake.y <= 20){

		ctx.clearRect(0,0,canvas.width,canvas.height);
		snake.x = 415-snakeSize/2;
		snake.y = 310-snakeSize/2;
		snake.speedY = 0;
		console.log("snake died y");
		lives = lives - 1;
		timeSurv = 0;
	// same here but for the y co-ords
	}
}


function hitAst(){
	// checks if the snake has hit an asteroid
	if (getDistance(allAsts[i].x, allAsts[i].y, snake.x, snake.y) < snake.radius + allAsts[i].radius){

		ctx.clearRect(0,0,canvas.width,canvas.height);
		snake.x = 415-snakeSize/2;
		snake.y = 310-snakeSize/2;
		snake.speedY = 0;
		snake.speedX = 0;
		console.log("snake hit ast");
		lives = lives - 1;
		timeSurv = 0;
	}
}


function createAst(){
	//creats new asteroids and puts them in "allAsts"

	if (astTimer === 5){
		// once the timer hits 5

		allAsts.unshift(new Ast(
			Math.floor(Math.random()*800)-astSize/2,
		//x
		18-astSize/2,
		//y
		//Math.random()*6-3,
		0,
		//speed x
		Math.random()*4+3,
		//speed y
		Math.floor(Math.random()*15 + 10)
		//radius
		));

		console.log(everyAst);
		//shows all the asteroids in the console
	}
}


function spawnAst(){
	// spawns the asteroids

	//ast 1
	if (astTimer >= 5) {
		// once the timer hits five or is over 5

		if (astTimer >= dif) {
		// once the timer reaches the number specified by the difficulty the timer resets
		astSpawnTimer1 = 0;
		}

		else {
			for (i = 0; i <= allAsts.length - 1; i++) {
				allAsts[i].move();
				allAsts[i].draw();
				// updates the ast

				hitAst();
				// calls the function that checks if the player has hit an ast
			}

			astTimer = astTimer + 1;
			// counts up the timer
		}
	}

	else {
		astTimer = astTimer + 1;
		// counts up the timer
	}
}


function astTimerClear() {
		if (astTimer >= dif) {
	  // once the timer reaches the number specified by the difficulty the timer resets
	  astTimer = 0;
	}
}


function clearAsts(){
// clears the array "allAsts" after there are 5 asts in it

// if (allAsts.length >= 10){
// allAsts.splice(1,allAsts.length);
// }
}


function snakeLives(){
	// checks if the player has run out of lives

	if (lives == 0){
		//if so then it resets the astTimer, the fruits position and calls another function
		astTimer = 0;
		spaceFruit.x = Math.floor(Math.random()*800)-fruitSize/2;
		spaceFruit.y = Math.floor(Math.random()*600)-fruitSize/2;
		console.log("Player died");
		death();
		// calls another function
	}
}


function death(){
	// does the death message

	ctx.clearRect(0,0,canvas.width,canvas.height);
	//clears the canvas

	var textDeath = {

		draw: function(){
			ctx.fillStyle = 'red';
			ctx.font = "70px Impact";
			ctx.fillText("You Died", 270, 330);
		}
	}

	setTimeout(function(){
	// after 3 seconds it resets the lives
	lives = 3;
	}, 3000);
	textDeath.draw();
	// draws the text
	score = 0;
	// resets the score
}


// function checkWin(){
// 	if (score == difScoreGoal) {
// 		astTimer = 0;
// 		spaceFruit.x = Math.floor(Math.random()*800)-fruitSize/2;
// 		spaceFruit.y = Math.floor(Math.random()*600)-fruitSize/2;
// 		console.log("Player won");
// 		win();
// 	}
// }


// function win(){
//
// 	ctx.clearRect(0,0,canvas.width,canvas.height);
//
// 	var textWin = {
//
// 		draw: function(){
// 			ctx.fillStyle = 'lime';
// 			ctx.font = "70px Impact";
// 			ctx.fillText("A Winner is You", 190, 330);
// 		}
// 	}
//
// 	setTimeout(function(){
// 	lives = 3;
// 	}, 3000);
//
// 	textWin.draw();
// 	score = 0;
// }


function easy() {
	// easy difficulty
	snakeSpeed = 3;
	// speed of snake
	dif = 320;
	// rate at which asteroids are spawned
	difficulty = "easy";
	// for difText
	difColor = "lime";
	// colour of difText
	difScoreGoal = 60;
}
function med() {
	// medium difficulty
	snakeSpeed = 3;
	dif = 160;
	difficulty = "medium";
	difColor = "cyan";
	difScoreGoal = 50;
}
function hard() {
	// hard difficulty
	snakeSpeed = 4;
	dif = 80;
	difficulty = "hard";
	difColor = "yellow";
	difScoreGoal = 40;
}
function ins() {
	// insane difficulty
	snakeSpeed = 5;
	dif = 40;
	difficulty = "insane";
	difColor = "tomato";
	difScoreGoal = 30;
}
function der() {
	// deranged difficulty
	snakeSpeed = 5;
	dif = 20;
	difficulty = "deranged";
	difColor = "red";
	difScoreGoal = 20;
}


function difCheck() {
	// checks if the player has selected a difficulty

	document.getElementById("startButton").innerHTML = "";

	var textDifSelect = {
		draw: function() {
			ctx.fillStyle = 'red';
			ctx.font = "70px Impact";
			ctx.fillText("Select a Difficulty", 145, 330);
		}
	}

	if (dif == undefined) {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		textDifSelect.draw();
	// if not then it draws the message "select a difficulty"
	}

	else {
		requestAnimationFrame(loop);
	// if so then it calls the game loop
	}
}


function loop() {
	// the game loop, aka the main function
	ctx.clearRect(0,0,canvas.width,canvas.height);

	gameArea.draw();
	scoreText.draw();
	livesText.draw();
	TimeSurvText.draw();
	playerNameText.draw();
	difText.draw();
	snake.move();
	snake.draw();
	spaceFruit.draw();
	// draws and moves a bunch of stuff

	createAst();
	spawnAst();
	astTimerClear();
	// asteroid things

	eatenFruitCheck();
	snakeBoundryCheck();
	spaceFruitCheck();

	clearAsts();
	// clears all the asteroids

	snakeLives();
	// other more general functions such as collision detection, clearing the asteroid array ect

	//checkWin();

	timeSurv = timeSurv + 1;
	// adds more time to the time survived every frame

	requestAnimationFrame(loop);
	// calls next frame
}

document.addEventListener('keydown', function(e) {
// player movement

if (e.key == "ArrowRight") {
	snake.speedX = snakeSpeed;
// this is where the snake speed thing is used
snake.speedY = 0;
}

else if (e.key == "ArrowLeft") {
	snake.speedX = -snakeSpeed;
	snake.speedY = 0;
}

else if (e.key == "ArrowUp") {
	snake.speedY = -snakeSpeed;
	snake.speedX = 0;
}

else if (e.key == "ArrowDown") {
	snake.speedY = snakeSpeed;
	snake.speedX = 0;
}

});



// makes the dropdown menu toggleable
// got this stuff from the last game which i got from w3 schools
function difMenu() {

	document.getElementById("d").classList.toggle("show");

}

window.onclick=function(event) {

	if (!event.target.matches('.difs')) {

		var dropdowns=document.getElementsByClassName("dropContent");
		var i;

		for (i=0;i<dropdowns.length;i++) {

			var openDropdown=dropdowns[i];

			if (openDropdown.classList.contains('show')) {

				openDropdown.classList.remove('show');
			}
		}
	}
}
// if you read everything... good job ;)
