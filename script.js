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
        middleMiddle: {
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
            moved: false
        },
        computer: {
            name: "Computer",
            symbol: symbols.computerSymbol,
            goesFirst: symbols.computerGoesFirst,
            moved: false
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
    return 'Human';
 } else if (game.players.human.goesFirst == false) {
    return 'Computer';
 }
}

function tellHumanToMove() {
    const tellToMove = document.createElement('node');
    tellToMove.innerHTML = "Pick your Square!"
    document.body.appendChild(tellToMove);
}

function humanMove (id, game) {
    console.log(game.gameBoard[id].marker);
    if (game.gameBoard[id].marker === " ") {
        game.gameBoard[id].marker = game.players.human.symbol;
        game.players.human.moved = true;
        addText(`${game.players.human.name} selects ${id}`);
        updateDOM(game);
        if ( game.players.computer.moved === false ) {
            computerMove(game);
            game.players.computer.moved = false;
            game.players.human.moved = false;
            checkIfWon(game);
        }
        else if ( game.players.computer.moved === true ) {
            game.players.computer.moved = false;
            game.players.human.moved = false;
            checkIfWon(game);
        }
    } else {
        addText('Spot already taken. Try again.')
    }
}


function computerMove (game) {
    let computerSymbol = game.players.computer.symbol;
    //try to get on a corner
    let random4 = getRandomInt(4);
    if (game.gameBoard.topLeft.marker == " " || game.gameBoard.topRight.marker == " " || game.gameBoard.bottomLeft.marker == " " || game.gameBoard.bottomRight.marker == " ") {
        switch (random4) {
            case 0: 
                if (game.gameBoard.topLeft.marker == " ") {
                    game.gameBoard.topLeft.marker = computerSymbol;
                    updateDOM(game);
                    addText(`Computer Selects Top Left`);
                    game.players.computer.moved = true;
                    break;
                } else {
                    computerMove(game);
                }
            case 1:
                if (game.gameBoard.bottomLeft.marker == " ") {
                    game.gameBoard.bottomLeft.marker = computerSymbol;
                    game.players.computer.moved = true;
                    updateDOM(game);
                    addText(`Computer Selects Bottom Left`);
                    break;
                } else {
                    computerMove(game);
                }
            case 2:
                if (game.gameBoard.topRight.marker == " ") {
                    game.gameBoard.topRight.marker = computerSymbol;
                    game.players.computer.moved = true;
                    updateDOM(game);
                    addText(`Computer Selects Top Right`);
                    break;
                } else {
                    computerMove(game);
                }
            case 3: 
            if (game.gameBoard.bottomRight.marker == " ") {
                game.gameBoard.bottomRight.marker = computerSymbol;
                game.players.computer.moved = true;
                updateDOM(game);
                addText(`Computer Selects Bottom Right`);
                break;
            } else {
                computerMove(game);
            }
        }
        return game;
      //Try to get in middle  
    } else if ( game.gameBoard.middleMiddle.marker == " ") {
        game.gameBoard.middleMiddle.marker = computerSymbol;
        game.players.computer.moved = true;
        updateDOM(game);
        addText(`Computer Selects Center`);
        return game;
    } else if ( game.gameBoard.middleLeft == " " || game.gameBoard.middleRight == " " || game.gameBoard.topMiddle == " " || game.gameBoard.bottomMiddle == " " ) {
        //if corners and middle spot is taken, randomly select one of the open remaining spots
        switch (random4) {
            case 0:
                if (game.gameBoard.middleLeft.marker == " ") {
                    game.gameBoard.middleLeft.marker = computerSymbol;
                    game.players.computer.moved = true;
                    updateDOM(game);
                    addText(`Computer Selects Middle Left`);
                    break;
                } else {
                    computerMove(game);
                }
            case 1:
                if (game.gameBoard.middleRight.marker = " ") {
                    game.gameBoard.middleRight.marker = computerSymbol;
                    game.players.computer.moved = true;
                    updateDOM(game);
                    addText(`Computer Selects Middle Right`);
                    break;
                } else {
                    computerMove(game);
                }
            case 2: 
                if (game.gameBoard.topMiddle.marker = " ") {
                    game.gameBoard.topMiddle.marker = computerSymbol;
                    game.players.computer.moved = true;
                    updateDOM(game);
                    addText(`Computer Selects Top Middle`);
                    break;
                } else {
                    computerMove(game);
                }
            case 3: 
                if (game.gameBoard.bottomMiddle.marker = " ") {
                    game.gameBoard.bottomMiddle.marker = computerSymbol;
                    game.players.computer.moved = true;
                    updateDOM(game);
                    addText(`Computer Selects Bottom Middle`);
                    break;
                } else {
                    computerMove(game);
                }
        }
    }
    return game;
}

function checkIfWon (game) {
    let board = game.gameBoard;
    boLe = board.bottomLeft.marker;
    boMi = board.bottomMiddle.marker;
    boRi = board.bottomRight.marker;
    miLe = board.middleLeft.marker;
    miMi = board.middleMiddle.marker;
    miRi = board.middleRight.marker;
    toLe = board.topRight.marker;
    toMi = board.topMiddle.marker;
    toRi = board.topRight.marker;
    //switch statement that checks for a winner
    switch (true) {
        case boLe == "O" && boMi == 'O' && boRi == 'O':
        case miLe == 'O' && miMi == 'O' && miRi == 'O':
        case toLe == 'O' && toMi == 'O' && toRi == 'O':
        case boLe == 'O' && miLe == 'O' && toLe == 'O':
        case boMi == 'O' && miMi == 'O' && toMi == 'O':
        case boRi == 'O' && miRi == 'O' && toRi == 'O':
        case toLe == 'O' && miMi == 'O' && boRi == 'O':
        case toRi == 'O' && miMi == 'O' && boLe == 'O':
            console.log("WINNER");
            break;
        case boLe == "X" && boMi == 'X' && boRi == 'X':
        case miLe == 'X' && miMi == 'X' && miRi == 'X':
        case toLe == 'X' && toMi == 'X' && toRi == 'X':
        case boLe == 'X' && miLe == 'X' && toLe == 'X':
        case boMi == 'X' && miMi == 'X' && toMi == 'X':
        case boRi == 'X' && miRi == 'X' && toRi == 'X':
        case toLe == 'X' && miMi == 'X' && boRi == 'X':
        case toRi == 'X' && miMi == 'X' && boLe == 'X':
            console.log("WINNER");
            break;
        default:
            playRound(game);
    }
}

function game () {
    let game = {};
    //generates players
    let players = createPlayers(assignSymbol(getRandomInt(2)));
    //generates game board
    let gameBoard = createGameboard();
    game.gameBoard = gameBoard;
    game.players = players;
    let first = whosFirst(game);
    createGameDOM(game, first);
    playRound(game, first);
    
    
}

function playRound(game, first) {
    if (first == 'human') {
        return game;
    }

    else if (first == 'computer') {
        computerMove(game);
        return game;
    }
}

game();

function createGameDOM(game, first) {
    const introHeader = document.createElement("h1");
    introHeader.setAttribute("id", 'header')
    introHeader.innerHTML = "Tic-Tac-Toe!";
    document.body.appendChild(introHeader);
    const container = document.createElement('div');
    container.setAttribute("id", 'container');
    document.body.appendChild(container);
    createBoxes('topLeft', game);
    createBoxes('topMiddle', game);
    createBoxes('topRight', game);
    createBoxes('middleLeft', game);
    createBoxes('middleMiddle', game);
    createBoxes('middleRight', game);
    createBoxes('bottomLeft', game);
    createBoxes('bottomMiddle', game);
    createBoxes('bottomRight', game);

    const textBox = document.createElement ('div');
    textBox.setAttribute("id", "textBox");
    document.body.appendChild(textBox);
    addText(`${first} goes first.`)
    
}

function addText(text, box) {

        let para = document.createElement("p");
        para.innerText = text;
        para.setAttribute('class', 'text');
        document.getElementById('textBox').appendChild(para);
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
    toLe.innerHTML = game.gameBoard.topLeft.marker;
    let toMi = document.getElementById('topMiddle');
    toMi.innerHtml = game.gameBoard.topMiddle.marker;
    let toRi = document.getElementById('topRight');
    toRi.innerHtml = game.gameBoard.topRight.marker;
    let miLe = document.getElementById('middleLeft');
    miLe.innerHtml = game.gameBoard.middleLeft.marker;
    let miMi = document.getElementById("middleMiddle");
    miMi.innerHTML = game.gameBoard.middleMiddle.marker;
    let miRi = document.getElementById("middleRight");
    miRi.innerHTML = game.gameBoard.middleRight.marker;
    let boLe = document.getElementById('bottomLeft');
    boLe = game.gameBoard.bottomLeft.marker;
    let boMi = document.getElementById('bottomMiddle');
    boMi.innerHTML = game.gameBoard.bottomMiddle.marker;
    let boRi = document.getElementById("bottomRight");
    boRi.innerHTML = game.gameBoard.bottomRight.marker;
}


//delete this to add start screen

//uncomment this to add a start screen

/*function createStartScreen() {
introContainer = document.createElement('div');
introContainer.setAttribute("id", "container");
introHeader = document.createElement("h1");
introHeader.innerHTML = "Tic-Tac-Toe!";
document.body.appendChild(introContainer);
container.appendChild(introHeader)

//adds start button to begin the game
startBtn = document.createElement('button');
startBtn.setAttribute("id", "startBtn");
startBtn.textContent = "Start";
startBtn.addEventListener("click", () => {
    introContainer.remove();
    createGameDOM();
    //game();
})
container.appendChild(startBtn);
}

createStartScreen();
*/

