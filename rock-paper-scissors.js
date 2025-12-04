function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3) + 1;

    if (randomNumber == 1) {
        return 'rock';
    } else if (randomNumber == 2) {
        return 'paper';
    }
    return 'scissors';
}

function getHumanChoice() {
    let humanChoice = Number(prompt('Please enter\n"1 for rock",\n"2 for paper" or \n"3 for scissor"'));
    if (humanChoice == 1) {
        return 'rock';
    } else if (humanChoice == 2) {
        return 'paper';
    }

    return 'scissors';
}

