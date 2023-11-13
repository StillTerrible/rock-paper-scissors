//v1.0 gets players choice thru prompt
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

function emulateRound(playerSelection, computerSelection) {
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

//original game starting thru console. not used after the UI update.
function game() {
    let playerWins = 0;
    let computerWins = 0;
    let ties = 0;

    for (let i = 1;i <= 5; i++) {
        console.log('Round '+ i + ':');
        let result = emulateRound(getPlayerChoice(),getComputerChoice()); //runs the game
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


function resetGame() {
    results.textContent = '';
    scoreDiv.textContent = `${score.pc = 0} - ${score.player = 0}`;
            
    rpsButtons.forEach(function(button) {
        button.disabled = false;
    });
    results.textContent = 'Press R To Reset The Game!';

    document.querySelector('#player-hand').src = `../img/rock.svg`;
    document.querySelector('#player-hand').alt = `A rock hand image.`
    document.querySelector('#computer-hand').src = `../img/rock.svg`;
    document.querySelector('#computer-hand').alt = `A rock hand image.`
}

const results = document.querySelector('#result-output');
const scoreBlock = document.querySelector('#results-block');
const rpsAllButtons = document.querySelector('#rps-buttons');
const rpsButtons = document.querySelectorAll('#rps-buttons button');
const scoreDiv = document.querySelector('#score');
const score = {pc: 0, player: 0};
const greyedOutColor = '#d1bfa4';
const defaultColor = '#ffebcd';


scoreDiv.textContent = `${score.pc} - ${score.player}`;
rpsAllButtons.addEventListener('click', function(event) {
    //checks the click was on a button and not bubbles from the div around them
    console.log(event);
    if (event.target.id === 'rps-buttons') {
        return;
    }

    
    let computerChoice = getComputerChoice();
    let gameResult = emulateRound(event.target.className, computerChoice);   
    results.textContent = gameResult;
    if (gameResult.includes("Won")){
        score.player++;
    }
    else if (gameResult.includes("Lost")) {
        score.pc++;
    }

    if (score.player === 5) {
        rpsButtons.forEach(function(button) {
            button.disabled = true;
            disabled = true;
        });

        const resultsPara = document.createElement('p');
        resultsPara.textContent = 'You Won!';

        const newGameButton = document.createElement('button');
        newGameButton.textContent = 'Start A New Game'
        newGameButton.addEventListener('click', () => {
            resetGame();
            resultsPara.remove();
            newGameButton.remove();
        });

        scoreBlock.appendChild(resultsPara);
        scoreBlock.appendChild(newGameButton);
    }

    else if (score.pc === 5) {
        rpsButtons.forEach(function(button) {
            button.disabled = true;
            disabled = true;
        });
        const resultsPara = document.createElement('p');
        resultsPara.textContent = 'Computer Won!';

        const newGameButton = document.createElement('button');
        newGameButton.textContent = 'Start A New Game'
        newGameButton.addEventListener('click', () => {
            resetGame();
            resultsPara.remove();
            newGameButton.remove();
        });

        scoreBlock.appendChild(resultsPara);
        scoreBlock.appendChild(newGameButton);

        
    }
        document.querySelector('#computer-hand').src = `../img/${computerChoice}.svg`;
        document.querySelector('#computer-hand').alt = `A ${computerChoice} hand image.`

        document.querySelector('#player-hand').src = `../img/${event.target.className}.svg`;
        document.querySelector('#player-hand').alt = `A ${event.target.className} hand image.`

    scoreDiv.textContent = `${score.pc} - ${score.player}`;
});

window.addEventListener('keypress', function(event) {
    console.log(event);
    if (event.key === 'r' && (!(score.pc === 5 || score.player === 5))) {
        resetGame();
    }
    else if (event.key === 'r') {
        resetGame();
        document.querySelector('#results-block p').remove();
        document.querySelector('#results-block button').remove();
    }
})



