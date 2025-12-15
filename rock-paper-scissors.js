let humanScore = 0;
let computerScore = 0;
let gameRound = 1;

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    return getChoice(randomNumber);
}

function getHumanChoice() {
    let humanChoice = Number(prompt('Please enter\n"1 for rock",\n"2 for paper" or \n"3 for scissor"'));
    
    if (humanChoice == 1 || humanChoice == 2 || humanChoice == 3) {
        return getChoice(humanChoice);
    }
    getHumanChoice();
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
    if (humanChoice == computerChoice) {
        console.log('%cIt\'s tie', 'color: yellow;');
        return 0;
    } else if (humanChoice == 'rock') {
        if (computerChoice == 'paper') {
            console.log('%cYou lose, paper wraps rock.', 'background-color: red;');
            return -1;
        } else {
            console.log('%cYou win, rock breaks scissors.', 'background-color: green;');
            return 1;
        }
    } else if (humanChoice == 'paper') {
        if (computerChoice == 'rock') {
            console.log('%cYou win, paper wraps rock.', 'background-color: green;');
            return 1;
        } else {
            console.log('%cYou lose, scissors cut paper.', 'background-color: red;');
            return -1;
        }
    } else {
        if (computerChoice == 'rock') {
            console.log('%cYou lose, rock breaks scissors.', 'background-color: red;');
            return -1;
        } else {
            console.log('%cYou win, scissors cut paper.', 'background-color: green');
            return 1;
        }
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
}

const humanPlayer = document.querySelector('.human-player');
const cards = humanPlayer.querySelector('.cards');

cards.addEventListener('click', (e) => {
    // e.taget returns img which is not what we want, we want the button.
    let humanChoice = e.target.parentElement.getAttribute('class');
    
    playGame(humanChoice);
});