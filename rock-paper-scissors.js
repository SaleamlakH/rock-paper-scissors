let humanScore = 0;
let computerScore = 0;

function playGame(event) {
    clearPreviousSelectedButtonStyle();
    
    const humanSelectedButton = event.target.parentElement;
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
        updateMessageDisplay(humanChoice, roundResult);
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
    const humanScore = document.querySelector('.human-score');
    const computerScore = document.querySelector('.computer-score');

    if (humanScore >= 3) {
        messageDisplay.textContent = 'You Win!';
        humanScore.classList.add('win');
        computerScore.classList.add('lose');
        messageDisplay.classList.add('win');
    } else {
        messageDisplay.textContent = 'You Lose!';
        humanScore.classList.add('lose');
        computerScore.classList.add('win');
        messageDisplay.classList.add('lose');
    }
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
    const buttons = document.querySelectorAll('.human-player button');

    buttons.forEach(button => {
        button.addEventListener('click', playGame);
    });
}

startGame();