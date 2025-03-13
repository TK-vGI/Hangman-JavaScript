const input = require('sync-input');

const wordsList = ['python', 'java', 'swift', 'javascript'];
const scores = {
    won: 0,
    lost:0,
    // addWin: function(){this.won = this.won + 1;},
    // addLost: function(){this.lost = this.lost + 1;},
}
let menu = function () {
    let key = true;
    do {
        let choice = input('Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: ');
        choice = choice.trim();
        switch (choice) {
            case 'play': {
                let result = hangMan();
                if (result === 1) {scores.won++;
                } else if (result === 0) {scores.lost++;}
                break;
            }
            case 'results': {
                scoreboard(scores);
                break;
            }
            case 'exit': {
                key = false;
                break;
            }
            default:
                break;
        }
    } while(key);
};
let scoreboard = function (scores) {
    console.log(`You won: ${scores.won} times.\nYou lost: ${scores.lost} times.`);
};
let hangMan = function () {

    let randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    let hiddenWord = "-".repeat(randomWord.length);
    let usedWrongLetters = [];
    let usedCorrectWords = [];

    console.log(`H A N G M A N`);

    while (usedWrongLetters.length < 8) {
        console.log(`${hiddenWord}`);
        let quiz = input("Input a letter: ");
        console.log(``);
        if (usedCorrectWords.includes(quiz)) {
            console.log("You've already guessed this letter.");
        }
        if (quiz.length === 1) {
            usedCorrectWords.push(quiz);
        }
        if (quiz.length !== 1) {
            console.log("Please, input a single letter.")
        }
        if (/[a-z]/.test(quiz) === false) {
            console.log("Please, enter a lowercase letter from the English alphabet.");
        }
        if (randomWord.includes(quiz)) {
            let newHiddenWord = "";
            for (let i = 0; i < randomWord.length; i++) {
                if (randomWord[i] === quiz && hiddenWord[i] === "-") {
                    newHiddenWord += quiz;
                } else {
                    newHiddenWord += hiddenWord[i];
                }
            }
            hiddenWord = newHiddenWord;
            if (newHiddenWord === randomWord) {
                console.log(`You guessed the word ${randomWord}!
You survived!`);
                return 1;
            }
        } else {
            if (quiz.length === 1 && /[a-z]/.test(quiz) === true) {
                console.log("That letter doesn't appear in the word.");
                usedWrongLetters.push(quiz);
            }
        }
    }
    if (hiddenWord !== randomWord) {
        console.log('You lost!');
        return 0;
    }
}

//start the game
menu();