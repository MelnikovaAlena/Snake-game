var snakeSpeed = 125;

var gameBoard = document.getElementById("game-board");

var boardWidth = 400;
var boardHeight = 400;

var squareSize = 20;

var snake = [
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
];

var apple = { x: 10, y: 10 };

var score = 0;

function drawSnake() {
    for (var i = 0; i < snake.length; i++) {
        var snakePart = document.createElement("div");
        snakePart.className = "snake";
        snakePart.style.left = snake[i].x * squareSize + "px";
        snakePart.style.top = snake[i].y * squareSize + "px";
        gameBoard.appendChild(snakePart);
    }
}

function drawApple() {
    var appleElement = document.createElement("div");
    appleElement.className = "apple";
    appleElement.style.left = apple.x * squareSize + "px";
    appleElement.style.top = apple.y * squareSize + "px";
    gameBoard.appendChild(appleElement);
}

function clearBoard() {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
}

function gameLoop() {
    clearBoard();
    moveSnake();
    drawSnake();
    drawApple();
    updateScore();
}

document.addEventListener("keydown", function (event) {
    changeDirection(event.keyCode);
});

function changeDirection(keyCode) {
    if (keyCode === 37 && direction !== "right") {
        direction = "left";
    } else if (keyCode === 38 && direction !== "down") {
        direction = "up";
    } else if (keyCode === 39 && direction !== "left") {
        direction = "right";
    } else if (keyCode === 40 && direction !== "up") {
        direction = "down";
    }
}

const restartButton = document.getElementById('restart-button')
restartButton.addEventListener('click', () => {
  this.resetGame()
})

function moveSnake() {
    var head = { x: snake[0].x, y: snake[0].y };

    if (direction === "right") {
        head.x++;
    } else if (direction === "left") {
        head.x--;
    } else if (direction === "up") {
        head.y--;
    } else if (direction === "down") {
        head.y++;
    }

    snake.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
        generateApple();
        score += 1;
    } else {
        snake.pop();
    }

    if (checkCollision()) {
        alert(`Конец игры!`);
        resetGame();
    }
}

function generateApple() {
    apple.x = Math.floor(Math.random() * (boardWidth / squareSize));
    apple.y = Math.floor(Math.random() * (boardHeight / squareSize));
}

function checkCollision() {
    var head = snake[0];

    if (
        head.x < 0 ||
        head.x >= boardWidth / squareSize ||
        head.y < 0 ||
        head.y >= boardHeight / squareSize
    ) {
        return true;
    }

    for (var i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function updateScore() {
    var scoreElement = document.getElementById("score"); 
    scoreElement.textContent = "Очки: " + score;
    let bestScore;
    if(localStorage.getItem('bestScore')) {
        let storageScore = localStorage.getItem('bestScore');
        if(storageScore > score) {
            bestScore = storageScore;
        } else {
            bestScore = score;
        }
    } else {
        bestScore = score;
    }
    localStorage.setItem('bestScore', bestScore);
    document.querySelector('#bestScore').innerHTML = `Лучший счет: 
    ${bestScore}`
}
    
function resetGame() {
    snake = [
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
    ];
    direction = "right";
    generateApple();
    score = 0;
}
var direction = "right";
setInterval(gameLoop, snakeSpeed);