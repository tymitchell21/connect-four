let columns = document.querySelectorAll(".column");
let turn = false;
let currentSetUp = [6,6,6,6,6,6,6]
let positions = [['w','w','w','w','w','w'],['w','w','w','w','w','w'],['w','w','w','w','w','w'],['w','w','w','w','w','w'],['w','w','w','w','w','w'],['w','w','w','w','w','w'],['w','w','w','w','w','w']]

// showCoin 
function showCoin (e) {
    const currentColumn = e.currentTarget;
    const destination = currentColumn.firstElementChild
    if (turn) display ('red', destination)
    else display ('black', destination)
}

// delete top coin
function hideCoin (e) {
    const currentColumn = e.currentTarget;
    if (currentColumn.firstElementChild.firstElementChild) {
        currentColumn.firstElementChild.removeChild(currentColumn.firstElementChild.firstElementChild)
    }
}

// function used to display a coin
function display (color, destination) {
    // creates p element and adds x to it 
    var newElement = document.createElement('div');
    newElement.classList.add(color)
    // adds p element to ans div
    destination.appendChild(newElement);
}

function addCoin(row, column, e) {
    hideCoin(e)

    var newElement = document.createElement('div');
    if (turn) newElement.classList.add('red')
    else newElement.classList.add('black')
    document.querySelector(`#r${column}${row}`).appendChild(newElement)
    
    var pos = -50*row;
    newElement.style.top = pos + 'px';
    var id = setInterval(frame, 5);
    function frame() {
        if (pos == 0) {
            clearInterval(id);
        } else {
            pos++; 
            newElement.style.top = pos + 'px';
        }
    }
    console.log(column, row)
    gameTracker (column, row)
    checkWin()
}

function gameTracker (column, row) {
    if (turn) {
        positions[column-1][row-1] = 'r'
    } else {
        positions[column-1][row-1] = 'b'
    }
}

function displayWin () {
    // creates p element and adds x to it 
    var newH2 = document.createElement('h2');
    var newButton = document.createElement('button');
    newButton.id = 'reset'
    if (turn) {
        var newText = document.createTextNode("Red Win's!");
    }
    else {
        var newText = document.createTextNode("Black Win's!");
    }
    var newText2 = document.createTextNode("Play Again?");
    newButton.appendChild(newText2)
    newH2.appendChild(newText);
    // adds p element to ans div
    var destination = document.getElementById('winner');
    destination.appendChild(newH2);
    destination.appendChild(newButton);
    lockGame()
    document.getElementById('reset').addEventListener('click', reset);
}

function lockGame() {
    // adds click event listener to each column
    columns.forEach (column => {
        column.removeEventListener('click', clickedColumn);
    })
    // adds a mouseover event listener to each column
    columns.forEach (column => {
        column.removeEventListener('mouseover', showCoin);
    })
    // adds a mouseout event listener to each column
    columns.forEach (column => {
        column.removeEventListener('mouseout', hideCoin);
    })
}

function reset () {
    window.location.reload();
}

function checkWin () {
    for (let i=0; i<positions.length; i++) {
        for (let j=0; j<3; j++) {
            if (positions[i][j]!='w'){
                if (i===3) {
                    if (positions[i][j] === positions[i][j+1] && positions[i][j] === positions[i][j+2] && positions[i][j] === positions[i][j+3]) {
                        displayWin()
                    } else if (positions[i][j] === positions[i-1][j+1] && positions[i][j] === positions[i-2][j+2] && positions[i][j] === positions[i-3][j+3]) {
                        displayWin()
                    } else if (positions[i][j] === positions[i+1][j+1] && positions[i][j] === positions[i+2][j+2] && positions[i][j] === positions[i+3][j+3]) {
                        displayWin()
                    } 
                } else if (i<3) {
                    if (positions[i][j] === positions[i][j+1] && positions[i][j] === positions[i][j+2] && positions[i][j] === positions[i][j+3]) {
                        displayWin()
                    } else if (positions[i][j] === positions[i+1][j+1] && positions[i][j] === positions[i+2][j+2] && positions[i][j] === positions[i+3][j+3]) {
                        displayWin()
                    } 
                } else {
                    if (positions[i][j] === positions[i][j+1] && positions[i][j] === positions[i][j+2] && positions[i][j] === positions[i][j+3]) {
                        displayWin()
                    } else if (positions[i][j] === positions[i-1][j+1] && positions[i][j] === positions[i-2][j+2] && positions[i][j] === positions[i-3][j+3]) {
                        displayWin()
                    }
                }
            }
        }
    }
    for (let i=0; i<4; i++) {
        for (let j=0; j<6; j++) {
            if (positions[i][j]!='w' && positions[i][j] === positions[i+1][j] && positions[i][j] === positions[i+2][j] && positions[i][j] === positions[i+3][j]) {
                displayWin()
            }
        }
    }
}

function clickedColumn (e) {
    let column = parseInt(e.currentTarget.id.slice(1,2))
    if (currentSetUp[column-1]>0) {
        addCoin(currentSetUp[column-1], column, e)
    }
    currentSetUp[column-1]--
    turn = !turn
    changeTurn()
}

function changeTurn () {
    if (turn) {
        document.querySelector('#turn').innerHTML = "It is Red's turn"
    } else {
        document.querySelector('#turn').innerHTML = "It is Black's turn"
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