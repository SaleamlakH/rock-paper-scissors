let humanScore = 0;
let computerScore = 0;
const gameRules = {
    rock: {beats: 'scissors', message: 'Rock breaks scissors'},
    paper: {beats: 'rock', message: 'Paper wraps rock'},
    scissors: {beats: 'paper', message: 'Scissors cut paper'}
};

function playGame(event) {
    clearPreviousSelectedButtonStyle();

    const humanSelectedButton = event.currentTarget;
    const humanChoice = humanSelectedButton.getAttribute('class');
    const computerChoice = getComputerChoice();
    let roundResult = getRoundResult(humanChoice, computerChoice);

    // computer choice is a string, e.g 'rock', humanSelectedButton is a button node
    styleSelectedButton(humanSelectedButton, computerChoice);

    [humanScore, computerScore] = updateScores(roundResult);

    if (humanScore >= 3 || computerScore >= 3) {
        displayEndMessage();
        endTheGame();
    } else {
        updateMessageDisplay(humanChoice, computerChoice, roundResult);
    }
}

function clearPreviousSelectedButtonStyle() {
    const buttons = document.querySelectorAll('.selectedButton');

    buttons.forEach(button => button.classList.remove('selectedButton'));
}

function styleSelectedButton(humanSelectedButton, computerChoice) {
    const computerSelectedButton = document.querySelector(`.computer-player .${computerChoice}`);

    humanSelectedButton.classList.toggle('selectedButton');
    computerSelectedButton.classList.toggle('selectedButton');
}

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
    return gameRules[humanChoice].beats === computerChoice ? 1 : -1;
}

function updateScores(roundResult) {
    const humanScoreDisplay = document.querySelector('.human-score');
    const computerScoreDisplay = document.querySelector('.computer-score');

    if (roundResult === 1) {
        humanScore++;
        humanScoreDisplay.textContent = humanScore;
    } else if (roundResult === -1) {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
    }

    return [humanScore, computerScore];
}

function endTheGame() {
    const buttons = document.querySelectorAll('.human-player button');

    buttons.forEach(button => button.removeEventListener('click', playGame));
}

function displayEndMessage() {
    const messageDisplay = document.querySelector('.message');
    const humanScoreDisplay = document.querySelector('.human-score');
    const computerScoreDisplay = document.querySelector('.computer-score');

    if (humanScore >= 3) {
        messageDisplay.textContent = 'You Win!';
        humanScoreDisplay.classList.add('win');
        computerScoreDisplay.classList.add('lose');
        messageDisplay.classList.add('win');
    } else {
        messageDisplay.textContent = 'You Lose!';
        humanScoreDisplay.classList.add('lose');
        computerScoreDisplay.classList.add('win');
        messageDisplay.classList.add('lose');
    }
}

//round message
function updateMessageDisplay (humanChoice, computerChoice, roundResult) {
    const messageDisplay = document.querySelector('.message');
    let message = getGameMessage(humanChoice, computerChoice, roundResult);

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

function getGameMessage(humanChoice, computerChoice, roundResult) {
    if (roundResult === 0) return 'TIE';

    return roundResult === 1
        ? `YOU WIN\n${gameRules[humanChoice].message}`
        : `YOU LOSE\n${gameRules[computerChoice].message}`
}

function startGame() {
    const buttons = document.querySelectorAll('.human-player button');

    buttons.forEach(button => {
        button.addEventListener('click', playGame);
    });
}

startGame();