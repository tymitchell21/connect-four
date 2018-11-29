let columns = document.querySelectorAll(".column");
let turn = false;
let currentSetUp = [6,6,6,6,6,6,6]
let positions = [
    ['w','w','w','w','w','w'],
    ['w','w','w','w','w','w'],
    ['w','w','w','w','w','w'],
    ['w','w','w','w','w','w'],
    ['w','w','w','w','w','w'],
    ['w','w','w','w','w','w'],
    ['w','w','w','w','w','w']
]

// runs when a column is clicked
function clickedColumn (e) {
    let column = parseInt(e.currentTarget.id.slice(1,2))

    if (currentSetUp[column-1]>0) {
        addCoin(currentSetUp[column-1], column, e)
        currentSetUp[column-1]--
        changeTurn()
    }
}
// shows a coin above the column that the mouse is hovering over
function showCoin (e) {
    const currentColumn = e.currentTarget;
    const destination = currentColumn.firstElementChild
    if (turn) display ('red', destination)
    else display ('black', destination)
}
// deletes the coin from showCoin once the mouse is no longer hovering over the column
function hideCoin (e) {
    const currentColumn = e.currentTarget;
    if (currentColumn.firstElementChild.firstElementChild) {
        currentColumn.firstElementChild.removeChild(currentColumn.firstElementChild.firstElementChild)
    }
}
// function used to display a coin
function display (color, destination) {
    var newCoin = document.createElement('div');
    newCoin.classList.add(color)
    destination.appendChild(newCoin);
}
// function that adds the coin to its position
function addCoin(row, column, e) {
    hideCoin(e)
    var newCoin = document.createElement('div');
    if (turn) newCoin.classList.add('red')
    else newCoin.classList.add('black')
    document.querySelector(`#r${column}${row}`).appendChild(newCoin)

    var pos = -50*row;
    newCoin.style.top = pos + 'px';
    var id = setInterval(frame, 1);
    var add = .1;
    
    function frame() {
        if (pos >= 0.0001) {
            clearInterval(id);
        } else {
            pos+=add; 
            add+=.01;
            newCoin.style.top = pos + 'px';
        }
    }
    gameTracker (column, row)
    checkWin()
}
// keeps track of the game with positions double array
function gameTracker (column, row) {
    if (turn) {
        positions[column-1][row-1] = 'r'
    } else {
        positions[column-1][row-1] = 'b'
    }
}
// changes the turn from black/red
function changeTurn () {
    turn = !turn
    if (turn) {
        document.querySelector('#turn').innerHTML = "It is Red's turn"
        document.querySelector('#turn').style.color = "#800000"
    } else {
        document.querySelector('#turn').innerHTML = "It is Black's turn"
        document.querySelector('#turn').style.color = "#141414"
    }
}
// function that checks to see if anybody has won
function checkWin () {
    let whoWins
    if (turn) {
        whoWins = "Red Wins!"
    }
    else {
        whoWins = "Black Wins!"
    }
    for (let i=0; i<positions.length; i++) {
        for (let j=0; j<3; j++) {
            if (positions[i][j]!='w'){
                if (positions[i][j] === positions[i][j+1] && positions[i][j] === positions[i][j+2] && positions[i][j] === positions[i][j+3]) {
                    displayWin(whoWins)
                }
                if (i<=3) {
                    if (positions[i][j] === positions[i+1][j+1] && positions[i][j] === positions[i+2][j+2] && positions[i][j] === positions[i+3][j+3]) {
                        displayWin(whoWins)
                    } 
                } 
                if (i>=3) {
                    if (positions[i][j] === positions[i-1][j+1] && positions[i][j] === positions[i-2][j+2] && positions[i][j] === positions[i-3][j+3]) {
                        displayWin(whoWins)
                    }
                }
            }
        }
    }
    for (let i=0; i<4; i++) {
        for (let j=0; j<6; j++) {
            if (positions[i][j]!='w' && positions[i][j] === positions[i+1][j] && positions[i][j] === positions[i+2][j] && positions[i][j] === positions[i+3][j]) {
                displayWin(whoWins)
            }
        }
    }
    let tie = true
    for (let i=0; i<positions.length; i++) {
        for (let j=0; j<6; j++) {
            if (positions[i][j]=='w') {
                tie = false
            }
        }
    }
    if (tie) displayWin("It is a tie!")
}
// creates a new element
function createWinner (element, text, color, id) {
    var newElement = document.createElement(element);
    if (id) newElement.id = id;
    newElement.style.color = color
    var newText = document.createTextNode(text);
    newElement.appendChild(newText)
    var destination = document.getElementById('winner');
    destination.appendChild(newElement);
}
// function that displays the winner and try again button
function displayWin (whoWins) {
    if (turn && whoWins!= "It is a tie!") {
        createWinner('h2', whoWins ,"#800000")
    }
    else {
        createWinner('h2', whoWins ,"#141414")
    }
    createWinner('button', "Play Again?" ,"#141414", 'reset')

    lockGame()
    document.getElementById('reset').addEventListener('click', reset);
}
// locks the game up so that no more pieces can be added
function lockGame() {
    columns.forEach (column => {
        column.removeEventListener('click', clickedColumn);
    })
    columns.forEach (column => {
        column.removeEventListener('mouseover', showCoin);
    })
    columns.forEach (column => {
        column.removeEventListener('mouseout', hideCoin);
    })
}
// function that reloads the page
function reset() {
    let boxes = document.querySelectorAll(".box");
    let pos = []
    for (let i=0; i<boxes.length; i++) {
        if (boxes[i].lastElementChild) {
            pos[i] = 0
        }
    }

    var myVar = setInterval(myTimer, 10)
    var add = .1;
    function myTimer () { 
        for (let j=0; j<boxes.length; j++) {
            if (pos[j]>750) {
                clearInterval(myVar);
                window.location.reload();
            } else {
                if (boxes[j].lastElementChild) {
                    let ran = Math.floor(Math.random() * (1 + 1))
                    pos[j]+=add + ran;
                    add+=.01;
                    boxes[j].lastElementChild.style.top = pos[j] + 'px'
                }
            }
        }
    }
}

// adds click event listener to each column
columns.forEach (column => {
    column.addEventListener('click', clickedColumn);
})
// adds a mouseover event listener to each column
columns.forEach (column => {
    column.addEventListener('mouseover', showCoin);
})
// adds a mouseout event listener to each column
columns.forEach (column => {
    column.addEventListener('mouseout', hideCoin);
})