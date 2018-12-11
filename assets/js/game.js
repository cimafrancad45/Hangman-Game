// Hangman words.
const words = [
    "RYU",
    "KEN",
    "SAGAT",
    "BLANKA",
    "GUILE",
    "CHUN-LI",
    "M.BISON",
    "AKUMA",
    "ZANGIEF",
    "DHALSIM",
    "BLANKA",
    "EHONDA",
    "CAMMY",
    "VEGA",
    "BALROG",
    "HADOKEN",
    "SHORYUKEN",
    "TATSUMAKISENPUUKYAKU",
    "SONIC BOOM",
    "TIGER UPPERCUT",
    "SPINNING BIRDKICK",
    "PSYCHO CRUSHER",
    "DOUBLE LARIAT",
    "YOGA FIRE",
    "ROLLING ATTACK"
];
// Selected puzzle.    
var puzzle;
// Arrays used for the hangman game.
var puzzleInput = [];
var puzzleAnswer = [];
// pressedLetters Array.
var pressedLetters = [];
var wrongLetters = [];
// Score variables.
var gameActive = false;
var round = 0;
var wins = 0;
var losses = 0;
var lives = 10;
var guessWins = 1;

//selects the hangman puzzle.
function randomSelect() {
    puzzle = words[Math.floor(Math.random() * words.length)];
    guessWins = puzzle.length;
    console.log(puzzle);
};

//resets game   
function reset() {
    puzzle = "";
    puzzleInput = [];
    puzzleAnswer = [];
    pressedLetters = [];
    wrongLetters = [];
    lives = 10;
    document.getElementById("letterGuessHeader").innerText = ("");
    document.getElementById("failGuess").innerText = ("");
}

//pushes the word to puzzle    
function pushPuzzle() {
    for (i = 0; i < puzzle.length; i++) {
        puzzleAnswer.push(puzzle[i]);
        puzzleInput.push(puzzle[i]);
        puzzleInput.splice(i, i, "_");
        guessWins = puzzleInput.length;
    };
    console.log(puzzleInput);
    console.log(puzzleAnswer);
}

//determines if guess is right
function rightGuess() {
    guessWins--;
    document.getElementById("game").innerText = (puzzleInput.join(""));
    console.log(guessWins);
    if (guessWins == 0) {
        youWin();
    }

}
//determines if guess is wrong     
function wrongGuess() {
    lives--;
    console.log(lives)
    if (lives === 0) {
        alert("K.O!");
    } else if (lives === 1) {
        alert("That letter is not part of the word! You have one last attempt!");
    } else {
        alert("That letter is not part of the word! You have " + lives + " tries remaining!");
    }
    document.getElementById("failGuess").innerText = (wrongLetters);
    lifeCount();
}

//keeps track of lives
function lifeCount() {
    if (lives > 1) {
        document.getElementById("attempts").innerText = (lives + " attempts remaining.")
    }
    else if (lives === 1) {
        document.getElementById("attempts").innerText = (lives + " attempt remaining.")
    }
    else if (lives == 0) {
        gameOver();
    }
};
//you win messaage
function youWin() {
    alert("YOU WIN!")
    wins++;
    gameActive = false;
    document.getElementById("start").innerText = ("Play again?");
    document.getElementById("gameHeader").innerText = ("Congratulations!")
    document.getElementById("wins").innerText = ("Wins: " + wins)
    document.getElementById("attempts").innerText = ("You win!")
    reset();
}
//game over message
function gameOver() {
    alert("YOU LOSE!")
    losses++;
    gameActive = false;
    document.getElementById("start").innerText = ("Play again?");
    document.getElementById("gameHeader").innerText = ("The answer was " + puzzle + ".")
    document.getElementById("losses").innerText = ("Losses: " + losses)
    document.getElementById("attempts").innerText = ("GAME OVER")
    reset();
};

//Start button code
function gameButton() {
    if (gameActive == false) {
        round++;
        alert("ROUND " + round + ", FIGHT!");
        document.getElementById("start").innerText = ("Give up?");
        document.getElementById("gameHeader").innerText = ("Press any key to guess the word!")
        document.getElementById("letterGuessHeader").innerText = ("Letters Guessed: ");
        document.getElementById("game").innerText = ("");
        gameActive = true;
        randomSelect();
        pushPuzzle();
        lifeCount();
        for (z = 0; z < puzzleInput.length; z++) {
            document.getElementById("game").append(puzzleInput[z]);
        };
    }
    else {
        var quit = confirm("You are still in the middle of the puzzle, are you going to give up?");
        if (quit == true) {
            gameOver();
        }
        else {
        };
    };
};
//Keyboard Input code

document.onkeyup = function (event) {
    if (gameActive == true && event.keyCode >= 65 && event.keyCode <= 90) {
        var pressedKey = event.key.toUpperCase();
        var repeatPress = pressedLetters.indexOf(pressedKey);
        var correctPress = puzzleAnswer.indexOf(pressedKey)
        pressedLetters.push(pressedKey);

        //checks for repeated guesses
        if (repeatPress > -1) {
            alert("You have already used this letter!")
            //wrong guess logic
        } else if (correctPress > -1) {
            for (i = 0; i < puzzleInput.length; i++) {
                if (puzzle[i] == pressedKey && puzzleInput[i] != pressedKey) {
                    puzzleInput.splice(i, 1, puzzle[i]);
                    rightGuess();
                    console.log(puzzleInput)
                };
            };
        } else {
            wrongLetters.push(pressedKey);
            wrongGuess();
        };
    };



    console.log(puzzle)
    console.log(puzzleInput)
};
