let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    switch (randomNumber) {
        case 1:
            return 'rock';
        case 2:
            return 'paper';
        case 3:
            return 'scissors';
    }
}

function getRoundResult(humanChoice, computerChoice) {
    if (humanChoice == computerChoice) return 0;
    
    if (humanChoice == 'rock') {
        if (computerChoice == 'paper') return -1;
        return 1;
    } else if (humanChoice == 'paper') {
        if (computerChoice == 'rock') return 1;
        return -1;
    } else {
        if (computerChoice == 'rock') return -1;
        return 1;
    }
}

function playGame(event) {
    const humanChoice = event.target.parentElement.getAttribute('class');
    const computerChoice = getComputerChoice();
    let roundResult = getRoundResult(humanChoice, computerChoice);

    if (roundResult) {
        roundResult == 1 ? humanScore++ : computerScore++;
    }

    if (humanScore >= 3 || computerScore >= 3) {
        displayEndMessage();
        endTheGame();
    } else {
        updateMessageDisplay(humanChoice, roundResult);
    }
    updateScoreDisplay();
}

function endTheGame() {
    const gameField = document.querySelector('.game-field');
    const scores = document.querySelectorAll('.score-container');
    
    gameField.replaceChildren(...scores);
    gameField.style.flexDirection = 'column';
}

function displayEndMessage() {
    const messageDisplay = document.querySelector('.message');

    if (humanScore >= 3) {
        messageDisplay.textContent = 'You Win!';
        messageDisplay.style.borderColor = 'rgb(0, 255, 0);';
    } else {
        messageDisplay.textContent = 'You Lose!';
        messageDisplay.style.borederColor = 'rgb(255, 0, 0);';
    }
}

function updateScoreDisplay() {
    const humanScoreDisplay = document.querySelector('.human-score');
    const computerScoreDisplay = document.querySelector('.computer-score');

    humanScoreDisplay.textContent = humanScore;
    computerScoreDisplay.textContent = computerScore;
}

//round message
function updateMessageDisplay (humanChoice, roundResult) {
    const messageDisplay = document.querySelector('.message');
    let message = getGameMessage(humanChoice, roundResult);

    messageDisplay.textContent = message;
    switch (roundResult) {
        case 1:
            messageDisplay.style.borderColor = 'rgb(0, 255, 0)';
            break;
        case -1:
            messageDisplay.style.borderColor = 'rgb(255, 0, 0)';
            break;
        case 0:
            messageDisplay.style.borderColor = 'rgb(255, 255, 0)';
    }
}

function getGameMessage(humanChoice, roundResult) {
    if (roundResult == 0) return 'Tie';

    let message = '';
    switch (humanChoice) {
        case 'rock':
            message = (roundResult == 1)
            ? 'YOU WIN!\nRock breaks scissors.'
            : 'YOU LOSE!\nPaper wraps Rocks.';
            break;
        case 'paper':
            message = (roundResult == 1)
            ? 'YOU WIN!\nPaper wraps rocks.'
            : 'YOU LOSE!\nScissors cut paper.';
            break;
        case 'scissors':
            message = (roundResult == 1)
            ? 'YOU WIN!\nScissors cut paper.'
            : 'YOU LOSE!\nRock breaks scissors.';
    }
    return message;
}


function startGame() {
    const humanPlayer = document.querySelector('.human-player');
    const buttons = Array.from(humanPlayer.querySelectorAll('button'));

    buttons.forEach(button => {
        button.addEventListener('click', playGame);
    });
}

startGame();