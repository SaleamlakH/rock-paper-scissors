let humanScore = 0;
let computerScore = 0;
let gameRound = 1;

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    return getChoice(randomNumber);
}

function getHumanChoice() {
    let humanChoice = Number(prompt('Please enter\n"1 for rock",\n"2 for paper" or \n"3 for scissor"'));
    return getChoice(humanChoice)
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
    } else if (humanChoice == 'rock') {
        if (computerChoice == 'paper') {
            console.log('%cYou lose, paper wraps rock.', 'background-color: red;');
            computerScore++;
        } else {
            console.log('%cYou win, rock breaks scissors.', 'background-color: green;');
            humanScore++;
        }
    } else if (humanChoice == 'paper') {
        if (computerChoice == 'rock') {
            console.log('%cYou win, paper wraps rock.', 'background-color: green;');
            humanScore++;
        } else {
            console.log('%cYou lose, scissors cut paper.', 'background-color: red;');
            computerScore++;
        }
    } else {
        if (computerChoice == 'rock') {
            console.log('%cYou lose, rock breaks scissors.', 'background-color: red;');
            computerScore++;
        } else {
            console.log('%cYou win, scissors cut paper.', 'background-color: green');
            humanScore++;
        }
    }
}

function playGame() {
    if (gameRound > 5) return;
    
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();

    playRound(humanChoice, computerChoice);
    gameRound++;
    playGame();
}