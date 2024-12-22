const gameBoardEl = document.getElementById("gameBoard");
const ctx = gameBoardEl.getContext("2d");
const scoreTextEl = document.getElementById("scoreText");
const startBtnEl = document.getElementById("startBtn");
const resetBtnEl = document.getElementById("resetBtn");
const gameWidth = gameBoardEl.width;
const gameHeight = gameBoardEl.height;
const boardBackground = "#FFF";
const snakeColor = "#4add11";
const snakeBorder = "000";
const foodColor = "#572663"
const unitSize = 25;

let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [    
    {x: unitSize * 3, y: 0 },
    {x: unitSize * 2, y: 0 },    
    {x: 0, y: 0 },   
];

window.addEventListener("keydown", changeDirection);
startBtnEl.addEventListener("click", gameStart);
resetBtnEl.addEventListener("click", resetGame);

function gameStart(){
    running = true;
    scoreTextEl.textContent = score;
    createFood();
    drawFood();
    nextTick();
};

function nextTick(){
    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100)
    } else {
        displayGameOver();
    } 
};

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

function createFood(){
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min ) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0 , gameWidth - unitSize)
    foodY = randomFood(0 , gameHeight - unitSize) 
};

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize)
};

function moveSnake(){
    const head  = { x: snake[0].x + xVelocity, 
                    y: snake[0].y + yVelocity};

    snake.unshift(head);
    //if food is eaten
    if(  snake[0].x == foodX && snake[0].y == foodY ){
        score+=1;
        scoreTextEl.textContent = score;
        createFood();
    }else {
        snake.pop();
    }
};

function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })

};

function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP =  38;
    const RIGHT = 39;
    const DOWN = 40;
    
    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    


    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
        break;
            case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;        
    }

        console.log(keyPressed);
        
};

function checkGameOver(){
    //snake hit edge top, left right and bottom, game over
    switch(true){
        case (snake[0].x < 0):
                running = false;
            break
        case (snake[0].x >= gameWidth):
                running = false;
            break
        case (snake[0].y < 0):
                running = false;
            break
        case (snake[0].y  >= gameHeight):
                running = false;
            break
    }
    //If the snake hits itself, the game is over.
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};

function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false
};

function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [        
        {x: unitSize * 3, y: 0 },
        {x: unitSize * 2, y: 0 },
        {x: 0, y: 0 },
    ];
    gameStart();
};

