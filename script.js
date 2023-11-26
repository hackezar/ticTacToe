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
            name: "human",
            symbol: symbols.humanSymbol,
            goesFirst: symbols.humanGoesFirst
        },
        computer: {
            name: "computer",
            symbol: symbols.computerSymbol,
            goesFirst: symbols.computerGoesFirst
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
    return 'human';
 } else if (game.players.human.goesFirst == false) {
    return 'computer';
 }
}

function playRound(game, first) {
    console.log(game.gameBoard);
    if (first == "human") {
        updatedGame = humanMove(game);
        if (updatedGame == 'quit') {
            return;
        }
        updatedGame = computerMove(game);
    } else if ( first == "computer") {
        updatedGame = computerMove(game);
        updatedGame = humanMove(game);
        if (updatedGame == 'quit') {
            return;
        }
    }
    checkIfWon(game, first);
    return game;
}

function humanMove (game) {
    let humanMove = prompt("Pick 1-9 for where to place your move");
    if (humanMove == 'quit'){
        return 'quit';
    }
    //loops through the board and finds the object with the number the human input
    for (const key in game.gameBoard) {
        if ( game.gameBoard[key].keyPress == humanMove) {
            if (game.gameBoard[key].marker === " ") {
            game.gameBoard[key].marker = game.players.human.symbol;
            } else {
                console.log("This spot is taken. Try another spot.");
                
            }
        } 
    }
    return game;
}


function computerMove (game) {
    let board = game.gameBoard;
    let computerSymbol = game.players.computer.symbol;
    //try to get on a corner
    let random4 = getRandomInt(4);
    if (board.topLeft.marker == " " || board.topRight.marker == " " || board.bottomLeft.marker == " " || board.bottomRight.marker == " ") {
        switch (random4) {
            case 0: 
                if (board.topLeft.marker == " ") {
                    board.topLeft.marker = computerSymbol;
                    break;
                } else {
                    computerMove(game);
                }
            case 1:
                if (board.bottomLeft.marker == " ") {
                    board.bottomLeft.marker = computerSymbol;
                    break;
                } else {
                    computerMove(game);
                }
            case 2:
                if (board.topRight.marker == " ") {
                    board.topRight.marker = computerSymbol;
                    break;
                } else {
                    computerMove(game);
                }
            case 3: 
            if (board.bottomRight.marker == " ") {
                board.bottomRight.marker = computerSymbol;
                break;
            } else {
                computerMove(game);
            }
        }
        return board;
      //Try to get in middle  
    } else if ( board.middleMiddle.marker == " ") {
        game.gameBoard.middleMiddle.marker = computerSymbol;
        return board;
    } else if ( board.middleLeft == " " || board.middleRight == " " || board.topMiddle == " " || board.bottomMiddle == " " ) {
        //if corners and middle spot is taken, randomly select one of the open remaining spots
        switch (random4) {
            case 0:
                if (board.middleLeft.marker == " ") {
                    board.middleLeft.marker = computerSymbol;
                    break;
                } else {
                    computerMove(game);
                }
            case 1:
                if (board.middleRight.marker = " ") {
                    board.middleRight.marker = computerSymbol;
                    break;
                } else {
                    computerMove(game);
                }
            case 2: 
                if (board.topMiddle.marker = " ") {
                    board.topMiddle.marker = computerSymbol;
                    break;
                } else {
                    computerMove(game);
                }
            case 3: 
                if (board.bottomMiddle.marker = " ") {
                    board.bottomMiddle.marker = computerSymbol;
                    break;
                } else {
                    computerMove(game);
                }
        }
    }
 

    
    return game;
}

function checkIfWon (game, first) {
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
            playRound(game, first);
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
    game = playRound(game, first);
}


game();


