let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("music/eatSnake.mp3");
let gameOverSound = new Audio("music/endGame.mp3");
let moveSound = new Audio("music/moveSnake.mp3");
let musicSound = new Audio("music/backgroundMusic.mp3");
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

// Define the board element and initialize it
const board = document.getElementById("board");
board.style.gridTemplateRows = "repeat(20, 1fr)";
board.style.gridTemplateColumns = "repeat(20, 1fr)";

// Game Function
let animationId;

function main(ctime) {
    animationId = requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;

    gameEngine();
}

// Collision detection function
function isCollide(snakeArr) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true; // Collision with itself
        }
    }
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true; // Wall collision
    }
    return false;
}

// Game Engine
function gameEngine() {
    // Part 1: Updating the snake array and food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over! Press any key to Play Again!!!!!!!");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;

        // Stop the game loop
        cancelAnimationFrame(animationId);

        // Restart background music
        musicSound.currentTime = 0;
        musicSound.play();
    }

    // If you have eaten food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            highscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;

        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });

    // Displaying the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// Game logic starts here
musicSound.loop = true; // Enable continuous looping of background music
musicSound.play(); // Start playing background music

let hiscoreval = localStorage.getItem("hiscore");
if (hiscoreval === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscoreval);
    highscoreBox.innerHTML = "HiScore: " + hiscoreval;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 }; // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});



// let inputDir = { x: 0, y: 0 };

// const foodSound = new Audio("music/eatSnake.mp3");
// const gameOverSound = new Audio("music/endGame.mp3");
// const moveSound = new Audio("music/moveSnake.mp3");
// const musicSound = new Audio("music/backgroundMusic.mp3");
// let speed = 5;
// let score = 0;
// let lastPaintTime = 0;
// let snakeArr = [
//     { x: 13, y: 15 }
// ];
// let food = { x: 6, y: 7 };

// // Define the board element and initialize it
// const board = document.getElementById("board");
// board.style.gridTemplateRows = "repeat(20, 1fr)";
// board.style.gridTemplateColumns = "repeat(20, 1fr)";

// // Game Function
// function main(ctime) {
//     window.requestAnimationFrame(main);
//     if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
//         return;
//     }
//     lastPaintTime = ctime;
    
//     gameEngine();
// }

// // Collision detection function
// function isCollide(snake) {
//     for (let i = 1; i < snake.length; i++) {
//         if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
//             return true; // Collision with itself
//         }
//     }
//     // If you  bump into the wall
//         if(snake[0].x >=18 || snake[0].x <=0 && snake[0].y >=18 || snake[0].y <=0){
//     return true;
// }
// }

// // Game Engine
// function gameEngine() {
//     // Part 1: Updating the snake array and food
//     if (isCollide(snakeArr)) {
//         gameOverSound.play();
//         musicSound.pause();
//         inputDir = { x: 0, y: 0 };
//         alert("Game Over! Press any key to Play Again!!!!!!!");
//         snakeArr = [{ x: 13, y: 15 }];
//         musicSound.play();
//         score = 0;
//     }

//     // If you have eaten food, increment the score and regenerate the food
//     if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
//         foodSound.play();
//         score += 1;
//         if(score > hiscoreval){
//             hiscoreval = score;
//             localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
//             highscoreBox.innerHTML = "HiScore: " + hiscoreval;
//         }
//         scoreBox.innerHTML ="score: " + score;
//         snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
//         let a = 2;
//         let b = 16;

//         food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
//     }

//     // Moving the snake
//     for (let i = snakeArr.length - 2; i >= 0; i--) {
//         snakeArr[i + 1] = { ...snakeArr[i] };
//     }
//     snakeArr[0].x += inputDir.x;
//     snakeArr[0].y += inputDir.y;

//     // Part 2: Displaying the snake
//     board.innerHTML = "";
//     snakeArr.forEach((e, index) => {
//         snakeElement = document.createElement("div");
//         snakeElement.style.gridRowStart = e.y;
//         snakeElement.style.gridColumnStart = e.x;

//         if (index === 0) {
//             snakeElement.classList.add("head");
//         } else {
//             snakeElement.classList.add("snake");
//         }
//         board.appendChild(snakeElement);
//     });

//     // Displaying the food
//     foodElement = document.createElement("div");
//     foodElement.style.gridRowStart = food.y;
//     foodElement.style.gridColumnStart = food.x;
//     foodElement.classList.add("food");
//     board.appendChild(foodElement);
// }

// // Game logic starts here
// musicSound.play();
// let hiscore = localStorage.getItem("hiscore");
// if(hiscore === null){
//     hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
// }else{
//     hiscoreval = JSON.parse(hiscore);
//     highscoreBox.innerHTML = "Hiscore: " + hiscoreval;
// }
// window.requestAnimationFrame(main);
// window.addEventListener("keydown", (e) => {
//     inputDir = { x: 0, y: 1 }; // Start the game
//     moveSound.play();
//     switch (e.key) {
//         case "ArrowUp":
//             inputDir.x = 0;
//             inputDir.y = -1;
//             break;

//         case "ArrowDown":
//             inputDir.x = 0;
//             inputDir.y = 1;
//             break;

//         case "ArrowLeft":
//             inputDir.x = -1;
//             inputDir.y = 0;
//             break;

//         case "ArrowRight":
//             inputDir.x = 1;
//             inputDir.y = 0;
//             break;

//         default:
//             break;
//     }
// });




