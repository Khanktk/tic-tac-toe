let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameContainer = document.querySelector(".game");

let turnO = true; // To keep track of the current player's turn
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Reset the game and show the game container
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    gameContainer.classList.remove("hide-game");  // Show the game container again
};

// Assign functionality to each box when clicked
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("o-player");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("x-player");
            turnO = true;
        }
        box.disabled = true;

        checkWinner();  // Check if there's a winner after the move
        checkDraw();    // Check if the game is a draw after the move
    });
});

// Disable all boxes after the game is won or drawn
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes and reset their content for a new game
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o-player", "x-player");
    }
};

// Show the winner message and hide the game container
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gameContainer.classList.add("hide-game");  // Hide the game container
    disableBoxes();  // Disable the boxes after the game ends
};

// Check if there's a winner based on the win patterns
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // If all three positions have the same non-empty value, declare the winner
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }
};

// Check if the game is a draw (no winner and all boxes filled)
const checkDraw = () => {
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;  // If any box is empty, the game isn't a draw yet
        }
    });

    if (allFilled && msgContainer.classList.contains("hide")) {
        msg.innerText = "Game is a draw. No winner!";
        msgContainer.classList.remove("hide");
        gameContainer.classList.add("hide-game");  // Hide the game container on draw
    }
};

// Reset game and start a new game when 'New Game' or 'Reset' button is clicked
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
