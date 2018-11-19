// Hangman words.
const words = [
    "RYU",
    "KEN",
    "SAGAT",
    "BLANKA",
    "GUILE",
    "CHUNLI",
    "MBISON",
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
    "SONICBOOM",
    "TIGERUPPERCUT",
    "SPINNINGBIRDKICK",
    "PSYCHOCRUSHER",
    "DOUBLELARIAT",
    "YOGAFIRE"
];
// Selected puzzle.    
var puzzle;
// Arrays used for the hangman game.
var puzzleInput = [];
// guessedLetters Array.
var guessedLetters = [];
var wrongLetters = [];
// Score variables.
var gameActive = false;
var round = 0;
var wins = 0;
var losses = 0;
var lives = 10;
var guessWins = 1;

//alphabet array for non-alphabet keypresses
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

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
    guessedLetters = [];
    lives = 10;
    document.getElementById("letterGuessHeader").innerText = ("");
}

//pushes the word to puzzle    
function pushPuzzle() {
    for (i = 0; i < puzzle.length; i++) {
        puzzleInput.push(puzzle[i]);
        puzzleInput.splice(i, i, "_");
        guessWins = puzzleInput.length;
    };
    console.log(puzzleInput);
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
    document.getElementById("failGuess").innerText = (guessedLetters);
    if (lives == 0) {
        gameOver();
    }
}

//keeps track of lives
function lifeCount() {
    if (lives > 1) {
        document.getElementById("attempts").innerText = ("You have " + lives + " attempts remaining.")
    }
    else if (lives == 1) {
        document.getElementById("attempts").innerText = ("You have " + lives + " attempt remaining.")
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
        var repeatGuess = guessedLetters.indexOf(pressedKey);
        guessedLetters.push(pressedKey);

        //checks for repeated guesses
        if (repeatGuess > -1) {
            alert("You have already used this letter!")
        } else {
            for (i = 0; i < puzzleInput.length; i++) {
                if (puzzle[i] == pressedKey && puzzleInput[i] != pressedKey) {
                    puzzleInput.splice(i, 1, puzzle[i]);
                    rightGuess();
                    console.log(puzzleInput)
                } else {
                    wrongLetters.push(pressedKey);
                    console.log(wrongLetters);
                }

            };

            // } else {

            // };
        };
    };
};



console.log(puzzle)
console.log(puzzleInput)

