function createGameboard() {
    return Gameboard = {
        topLeft: {
            keyPress: 7,
            marker: " "
        },
        topMiddle: {
            keyPress: 8,
            marker: " "
        },
        topRight: {
            keyPress: 9,
            marker: " "
        },
        middleLeft: {
            keyPress: 4,
            marker: " "
        },
        center: {
            keyPress: 5,
            marker: " "
        },
        middleRight: {
            keyPress: 6,
            marker:  " "
        },
        bottomLeft: {
            keyPress: 1,
            marker: " "
        },
        bottomMiddle: {
            keyPress: 2,
            marker: " "
        },
        bottomRight: {
            keyPress: 3,
            marker: " "
        }
    }
}

function createPlayers (symbols) {
    return Players = {
        human: {
            name: "Human",
            symbol: symbols.humanSymbol,
            goesFirst: symbols.humanGoesFirst,
            moved: false,
            gameOver: false
        },
        computer: {
            name: "Computer",
            symbol: symbols.computerSymbol,
            goesFirst: symbols.computerGoesFirst,
            moved: false,
            gameOver: false
        }
    }
}

//function that randomly picks 1 or 0
function getRandomInt(num) {
    return Math.floor(Math.random() * num);
}
//assigns X or O to players based on getRandomInt()
//whoever is X will go first
function assignSymbol(random) {
    let symbols = {};
    if (random === 0) {
        symbols.humanSymbol = "X";
        symbols.humanGoesFirst = true;
        symbols.computerSymbol = "O";
        symbols.computerGoesFirst = false;
    }else if (random  ===1) {
        symbols.humanSymbol = "O";
        symbols.humanGoesFirst = false;
        symbols.computerSymbol = "X";
        symbols.computerGoesFirst = true;
    }
    return symbols;
}

function whosFirst (game) {
 if (game.players.human.goesFirst == true) {
    return game.players.human.name;
 } else if (game.players.human.goesFirst == false) {
    return game.players.computer.name;
 }
}

function humanMove (id, game) {
    if (game.players.human.gameOver === false) {
        if (game.gameBoard[id].marker === " ") {
            game.gameBoard[id].marker = game.players.human.symbol;
            game.players.human.moved = true;
            addText(`${game.players.human.name} selects ${id}`);
            updateDOM(game);
            checkIfWon(game);
            playRound(game);
        } else {
            addText('Spot already taken. Try again.')
        }
    } else {
        addText("Game is Over. Press button to play again")
    }
}


function computerMove (game) {
    //check if game is over
    if (game.players.computer.gameOver === false) {
        let board = game.gameBoard;
        let computerSymbol = game.players.computer.symbol;
        //1. Go for a corner
        if (board.topLeft.marker == " ") {
            game.gameBoard.topLeft.marker = computerSymbol;
            game.players.computer.moved = true;
            updateDOM(game);
            addText(`Computer selects Top Left`);
            checkIfWon(game);
            playRound(game);
        } else if (board.topRight.marker == " ") {
            game.gameBoard.topRight.marker = computerSymbol;
            game.players.computer.moved = true;
            updateDOM(game);
            addText('Computer selects Top Left');
            checkIfWon(game);
            playRound(game);
        } else if (board.bottomLeft.marker == " "){
            game.gameBoard.bottomLeft.marker = computerSymbol;
            game.players.computer.moved = true;
            updateDOM(game);
            addText('Computer selects Bottom Left');
            checkIfWon(game);
            playRound(game);
        } else if (board.bottomRight.marker == " ") {
            game.gameBoard.bottomRight.marker = computerSymbol;
            game.players.computer.moved = true;
            updateDOM(game);
            addText('Computer selects Bottom Right');
            checkIfWon(game);
            playRound(game);
        } else if (board.center.marker == " ") {
            game.gameBoard.center.marker = computerSymbol;
            game.players.computer.moved = true;
            updateDOM(game);
            addText('Computer selects Center');
            checkIfWon(game);
            playRound(game);
        } else if (board.middleLeft.marker == " ") {
            game.gameBoard.middleLeft.marker = computerSymbol;
            game.players.computer.moved = true;
            updateDOM(game);
            addText('Computer Selects Middle Left');
            checkIfWon(game);
            playRound(game);
        } else if (board.middleRight.marker == " ") {
            game.gameBoard.middleRight.marker = computerSymbol;
            game.players.computer.moved = true;
            updateDOM(game);
            addText('Computer Selects Middle Right');
            checkIfWon(game);
            playRound(game);
        } else if (board.topMiddle.marker == " ") {
            game.gameBoard.topMiddle.marker = computerSymbol;
            game.players.computer.moved = true;
            updateDOM(game);
            addText('Computer Selects Top Middle');
            checkIfWon(game);
            playRound(game);
        } else if (board.bottomMiddle.marker == " ") {
            game.gameBoard.bottomMiddle.marker = computerSymbol;
            game.players.computer.moved = true;
            updateDOM(game);
            addText('Computer Selects Bottom Middle');
            checkIfWon(game);
            playRound(game);
        } 
    } else {
        return;
    }
    
}

function checkIfWon (game) {
    let board = game.gameBoard;
    boLe = board.bottomLeft.marker;
    boMi = board.bottomMiddle.marker;
    boRi = board.bottomRight.marker;
    miLe = board.middleLeft.marker;
    cent = board.center.marker;
    miRi = board.middleRight.marker;
    toLe = board.topRight.marker;
    toMi = board.topMiddle.marker;
    toRi = board.topRight.marker;
    //switch statement that checks for a winner
    switch (true) {
        case boLe == "O" && boMi == 'O' && boRi == 'O':
        case miLe == 'O' && cent == 'O' && miRi == 'O':
        case toLe == 'O' && toMi == 'O' && toRi == 'O':
        case boLe == 'O' && miLe == 'O' && toLe == 'O':
        case boMi == 'O' && cent == 'O' && toMi == 'O':
        case boRi == 'O' && miRi == 'O' && toRi == 'O':
        case toLe == 'O' && center == 'O' && boRi == 'O':
        case toRi == 'O' && center == 'O' && boLe == 'O':
            if (game.players.human.symbol == "O") {
                addText("Congratulations, you win.");
                endGame(game)
            } else {
                addText("Sorry, you lost.");
                endGame(game)
            }
            break;
        case boLe == "X" && boMi == 'X' && boRi == 'X':
        case miLe == 'X' && cent == 'X' && miRi == 'X':
        case toLe == 'X' && toMi == 'X' && toRi == 'X':
        case boLe == 'X' && miLe == 'X' && toLe == 'X':
        case boMi == 'X' && cent == 'X' && toMi == 'X':
        case boRi == 'X' && miRi == 'X' && toRi == 'X':
        case toLe == 'X' && cent == 'X' && boRi == 'X':
        case toRi == 'X' && cent == 'X' && boLe == 'X':
            if (game.players.human.symbol == "X") {
                addText("Congratulations, you win.");
                endGame(game);
            } else {
                addText("Sorry, you lost");
                endGame(game);
            }
            break;
        case boLe != " " && boMi != " " && boRi != " " && miLe != " " && cent != " " && miRi != " "
        && toLe != " " && toMi != " " && toRi != " ":
            addText("Close one! It's a tie.");
            endGame(game);
        default:
            return;
    }
}

function game (userName) {
    let game = {};
    //generates players
    let players = createPlayers(assignSymbol(getRandomInt(2)));
    players.human.name = userName;
    //generates game board
    let gameBoard = createGameboard();
    game.gameBoard = gameBoard;
    game.players = players;
    let first = whosFirst(game);
    createGameDOM(game, first);
    playRound(game, first);
    }

function playRound(game) {
    let human = game.players.human;
    let computer = game.players.computer;
    if (human.goesFirst == true && human.moved == false ) {
        addText('Make your move');
        return;
    } else if (human.goesFirst == true && human.moved == true && computer.moved == false) {
        computerMove(game);
    } else if (human.goesFirst == true && human.moved == true && computer.moved == true) {
        human.moved = false;
        computer.moved = false;
        playRound(game);
    } else if (computer.goesFirst == true && computer.moved == false) {
        computerMove(game);
        playRound(game);
    } else if (computer.goesFirst == true && computer.moved == true && human.moved == false) {
        addText('Make your move');
        return;
    } else if (computer.goesFirst == true && computer.moved == true && human.moved == true) {
        game.players.human.moved = false;
        game.players.computer.moved = false;
        playRound(game);
    }
    

}

function createGameDOM(game, first) {
    const appContainer = document.createElement('div');
    appContainer.setAttribute('id', 'appContainer');
    document.body.appendChild(appContainer);
    const introHeader = document.createElement("div");
    introHeader.setAttribute("id", 'headerDiv')
    appContainer.appendChild(introHeader);
    const introHeading = document.createElement('h1');
    introHeading.innerHTML = "Tic-Tac-Toe!";
    introHeading.setAttribute('id', 'header');
    appContainer.appendChild(introHeading);
    const container = document.createElement('div');
    container.setAttribute("id", 'container');
    appContainer.appendChild(container);
    createBoxes('topLeft', game);
    createBoxes('topMiddle', game);
    createBoxes('topRight', game);
    createBoxes('middleLeft', game);
    createBoxes('center', game);
    createBoxes('middleRight', game);
    createBoxes('bottomLeft', game);
    createBoxes('bottomMiddle', game);
    createBoxes('bottomRight', game);

    const textBox = document.createElement ('div');
    textBox.setAttribute("id", "textBox");
    appContainer.appendChild(textBox);
    addText(`${first} goes first.`);
}

function clearDom () {
    document.getElementById('appContainer').remove();
}

function addText(text) {

        let para = document.createElement("p");
        para.innerText = text;
        para.setAttribute('class', 'text');
        document.getElementById('textBox').appendChild(para);

        const textBox = document.getElementById('textBox');
        textBox.scrollTop = textBox.scrollHeight;
        return;
    
        
}

//create 9 tic tac toe boxes
function createBoxes(id, game) {
    const box = document.createElement('div');
    box.setAttribute('id', id);
    box.setAttribute('class', 'box');
    document.getElementById('container').appendChild(box);
    createBoxEventListeners(id, game);
}

//create click monitoring for the boxes in html
function createBoxEventListeners(id, game) {
    const box = document.getElementById(id)
    return box.addEventListener("click", () => {
        humanMove(id, game);
    });
}


//updates the dom based off the gameBoard object
function updateDOM(game) {
    let toLe = document.getElementById('topLeft');
    toLe.innerText = game.gameBoard.topLeft.marker;
    let toMi = document.getElementById('topMiddle');
    toMi.innerText = game.gameBoard.topMiddle.marker;
    let toRi = document.getElementById('topRight');
    toRi.innerText = game.gameBoard.topRight.marker;
    let miLe = document.getElementById('middleLeft');
    miLe.innerText = game.gameBoard.middleLeft.marker;
    let center = document.getElementById("center");
    center.innerText = game.gameBoard.center.marker;
    let miRi = document.getElementById("middleRight");
    miRi.innerText = game.gameBoard.middleRight.marker;
    let boLe = document.getElementById('bottomLeft');
    boLe.innerText = game.gameBoard.bottomLeft.marker;
    let boMi = document.getElementById('bottomMiddle');
    boMi.innerText = game.gameBoard.bottomMiddle.marker;
    let boRi = document.getElementById("bottomRight");
    boRi.innerText = game.gameBoard.bottomRight.marker;
    return game;
}

function endGame(gameBoard) {
    gameBoard.players.human.gameOver = true;
    gameBoard.players.computer.gameOver = true;
    addText("Press Button to play again.");
    const replayBtn =  document.createElement('button');
    replayBtn.setAttribute("id", "replayBtn");
    replayBtn.innerText = "Play Again";
    replayBtn.addEventListener("click", () => {
        clearDom();
        game();
    })
    document.getElementById('appContainer').appendChild(replayBtn);
}




//uncomment this to add a start screen

function createStartScreen() {
introContainer = document.createElement('div');
introContainer.setAttribute("id", "introContainer");
introHeader = document.createElement("h1");
introHeader.innerHTML = "Tic-Tac-Toe!";
introInput = document.createElement("input");
introInput.setAttribute('id', 'nameInput');
introInput.name = "nameInput";
introInput.placeholder = "Enter Name:";
document.body.appendChild(introContainer);
introContainer.appendChild(introHeader)
introContainer.appendChild(introInput);

//adds start button to begin the game
startBtn = document.createElement('button');
startBtn.setAttribute("id", "startBtn");
startBtn.textContent = "Start";
startBtn.addEventListener("click", () => {
    let userName = document.getElementById('nameInput').value;
    introContainer.remove();
    if ( userName == "") {
        userName = "Human";
    }
    game(userName);
})

introContainer.appendChild(startBtn);
author = document.createElement('p');
author.setAttribute('id', 'author');
author.innerText = "Created by Jack Halcisak";
introContainer.appendChild(author);
}

createStartScreen();


