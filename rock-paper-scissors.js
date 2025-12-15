let humanScore = 0;
let computerScore = 0;
let gameRound = 1;

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    return getChoice(randomNumber);
}

function getChoice(choice) {
    if (choice == 1) {
        return 'rock';
    } else if (choice == 2) {
        return 'paper';
    }

    return 'scissors';
}

function playRound(humanChoice, computerChoice) {
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

function playGame(humanChoice) {
    if (humanScore >= 3) {
        console.log('Congratulations! You win!');
        return;
    } else if (computerScore >= 3) {
        console.log('Sorry! You lose!');
        return;
    }
    
    const computerChoice = getComputerChoice();
    let roundResult = playRound(humanChoice, computerChoice);

    if (roundResult) {
        roundResult == 1 ? humanScore++ : computerScore++;
        gameRound++;
    }

    updateMessageDisplay(humanChoice, roundResult);
    updateScoreDisplay();
}

function updateScoreDisplay() {
    const humanScoreDisplay = document.querySelector('.human-score');
    const computerScoreDisplay = document.querySelector('.computer-score');

    humanScoreDisplay.textContent = humanScore;
    computerScoreDisplay.textContent = computerScore;
}

function updateMessageDisplay (humanChoice, roundResult) {
    const messageDisplay = document.querySelector('.message');
    let message = getGameMessage(humanChoice, roundResult)
    
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

const humanPlayer = document.querySelector('.human-player');
const cards = humanPlayer.querySelector('.cards');

cards.addEventListener('click', (e) => {
    // e.taget returns img which is not what we want, we want the button.
    let humanChoice = e.target.parentElement.getAttribute('class');
    
    playGame(humanChoice);
});