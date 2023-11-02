function getPlayerChoice(){
    let keepGoing = true;
    let choice;
    while(keepGoing)
    {
        choice = prompt("Enter Your Play:");
        choice = choice.toLowerCase();
       
            if(choice === 'r' || choice === 'rock') { 
                choice = 'rock';
                keepGoing = false;
            }
            else if(choice === 's' || choice === 'scissors') { 
                choice = 'scissors';
                keepGoing = false;
            }
            else if(choice === 'p' || choice === 'paper') { 
                choice = 'paper'
                keepGoing = false;
            }
            else {
                console.log(`you need to choose a valid play.
                Try Rock, Paper or Scissors.`)
            }
        
    }
    return choice;
}

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);
    let pcChoice;
    switch(randomNumber){
        case 2:
            pcChoice = 'rock';
            break;
        case 1:
            pcChoice = 'paper';
            break;
        case 0:
            pcChoice = 'scissors'
            break;
    }
    return pcChoice;
}

function playRound(playerSelection, computerSelection) {
    let result;
    //checks if player won
    if(playerSelection === 'rock'&& computerSelection === 'scissors' || playerSelection === 'scissors'&& computerSelection === 'paper' || playerSelection === 'paper'&& computerSelection === 'rock') {
        result = `You Won! ${playerSelection} beats ${computerSelection}.`;
        }

    //checks if pc won
    else if(computerSelection === 'rock'&& playerSelection === 'scissors' || computerSelection === 'scissors'&& playerSelection === 'paper' || computerSelection === 'paper'&& playerSelection === 'rock') {
        result = `You Lost! ${computerSelection} beats ${playerSelection}.`;
    }
    //tie
    else {
        result = `It's A Tie! You both picked ${playerSelection}.`;
    }

    return result;
}

function game() {
    let playerWins = 0;
    let computerWins = 0;
    let ties = 0;

    for (let i = 1;i <= 5; i++) {
        console.log('Round '+ i + ':');
        let result = playRound(getPlayerChoice(),getComputerChoice()); //runs the game
        if (result.includes("Won")){
            playerWins++;
            console.log(result);
        }
        else if (result.includes("Lost")) {
            computerWins++;
            console.log(result);
        }
        else {
            ties++;
            console.log(result);
        }
    }

    if (playerWins > computerWins) {
        console.log('You Won The Game!');
    }
    else if(ties === 5)
    {
        console.log('Umm, H O W ? (5 Ties)');
    }
    else {
        console.log('You Lost The Game :(');
    }
    console.log(`
    player won ${playerWins} times
    computer won ${computerWins} times
    and ${ties} ties.`)
}


game();

