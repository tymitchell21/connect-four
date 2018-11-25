let columns = document.querySelectorAll(".column");
let turn = false;
let currentSetUp = [6,6,6,6,6,6,6]
let positions = [['w','w','w','w','w','w'],['w','w','w','w','w','w'],['w','w','w','w','w','w'],['w','w','w','w','w','w'],['w','w','w','w','w','w'],['w','w','w','w','w','w'],['w','w','w','w','w','w']]

// runs when a column is clicked
function clickedColumn (e) {
    // sets column to id of the clicked column (grabbing the column number from the id)
    let column = parseInt(e.currentTarget.id.slice(1,2))
    // currentSetUp keeps track of the # of free space in each column.  if it is greater than zero, add a coin
    if (currentSetUp[column-1]>0) {
        // calls the function addCoin and passes the free spaces, column number, and e
        addCoin(currentSetUp[column-1], column, e)
    }
    // subtracts one from currentSetUp[column-1], representing one less free space in column
    currentSetUp[column-1]--
    // runs the function changeTurn
    changeTurn()
}
// shows a coin above the column that the mouse is hovering over
function showCoin (e) {
    // grabs the current column that the mouse is over and sets it to currentColumn
    const currentColumn = e.currentTarget;
    // grabs the first element child of the current child (a div about the rest of the game), and sets it to destination
    const destination = currentColumn.firstElementChild
    // if it is red's turn, displays a red coin above the column
    if (turn) display ('red', destination)
    // if it is black's turn, displays a black one
    else display ('black', destination)
}
// deletes the coin from showCoin once the mouse is no longer hovering over the column
function hideCoin (e) {
    // sets the current target to variable current column
    const currentColumn = e.currentTarget;
    // if there is disk in the top div
    if (currentColumn.firstElementChild.firstElementChild) {
        // then remove that disk
        currentColumn.firstElementChild.removeChild(currentColumn.firstElementChild.firstElementChild)
    }
}
// function used to display a coin
function display (color, destination) {
    // creates div element and sets it to newDisk
    var newCoin = document.createElement('div');
    newCoin.classList.add(color)
    // adds newCoin element to destination
    destination.appendChild(newCoin);
}
// function that adds the coin to its position
function addCoin(row, column, e) {
    // begins by hiding the coin that is hovering over the column
    hideCoin(e)
    // creates a new div and sets it to newCoin
    var newCoin = document.createElement('div');
    // if it is red's turn, adds the red class
    if (turn) newCoin.classList.add('red')
    // else adds the black class
    else newCoin.classList.add('black')
    // grabs the next open position in column based on column and row variables, and appends the newCoin to it
    document.querySelector(`#r${column}${row}`).appendChild(newCoin)
    // start position is determined by -50*row (each box is 50px tall)
    var pos = -50*row;
    // set's newCoin's starting position to pos
    newCoin.style.top = pos + 'px';
    // creates time interval
    var id = setInterval(frame, 5);
    // This moves the coin from it's top position to it's resting position
    function frame() {
        if (pos == 0) {
            clearInterval(id);
        } else {
            pos++; 
            newCoin.style.top = pos + 'px';
        }
    }
    // calls function gameTracker
    gameTracker (column, row)
    // calls function checkWin
    checkWin()
}
// keeps track of the game with positions double array
function gameTracker (column, row) {
    // changes 'w' to 'r' if it is red's turn, in the current position
    if (turn) {
        positions[column-1][row-1] = 'r'
    // changes 'w' to 'b' if it is black's turn
    } else {
        positions[column-1][row-1] = 'b'
    }
}
// changes the turn from black/red
function changeTurn () {
    // changes variable turn that keeps track of turn
    turn = !turn
    // switches the turn p element's innerHTML to say whose turn it is
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
    // if it is red's turn, creates text node 'Red Wins'
    let whoWins
    if (turn) {
        whoWins = "Red Wins!"
    }
    // if it is black's turn, creates text node 'Black Wins'
    else {
        whoWins = "Black Wins!"
    }
    // runs through the columns
    for (let i=0; i<positions.length; i++) {
        // runs through the top three rows
        for (let j=0; j<3; j++) {
            // makes sure the position isn't just black (no disk)
            if (positions[i][j]!='w'){
                // then it checks to see if there is four of a kind vertical
                if (positions[i][j] === positions[i][j+1] && positions[i][j] === positions[i][j+2] && positions[i][j] === positions[i][j+3]) {
                    // runs function displayWin
                    displayWin(whoWins)
                }
                // if i = 3, or it is in the middle column
                if (i===3) {
                    // checks to see if there is four of a kind left diagonal
                    if (positions[i][j] === positions[i-1][j+1] && positions[i][j] === positions[i-2][j+2] && positions[i][j] === positions[i-3][j+3]) {
                        displayWin(whoWins)
                    // checks to see if there is four of a kind right diagonal
                    } else if (positions[i][j] === positions[i+1][j+1] && positions[i][j] === positions[i+2][j+2] && positions[i][j] === positions[i+3][j+3]) {
                        displayWin(whoWins)
                    }
                // if it is the first three columns 
                } else if (i<3) {
                    // checks for right diagonal
                    if (positions[i][j] === positions[i+1][j+1] && positions[i][j] === positions[i+2][j+2] && positions[i][j] === positions[i+3][j+3]) {
                        displayWin(whoWins)
                    } 
                // else (last three columns)
                } else {
                    // checks for left diagonal
                    if (positions[i][j] === positions[i-1][j+1] && positions[i][j] === positions[i-2][j+2] && positions[i][j] === positions[i-3][j+3]) {
                        displayWin(whoWins)
                    }
                }
            }
        }
    }
    // runs through the first 4 columns
    for (let i=0; i<4; i++) {
        // runs through all of the rows
        for (let j=0; j<6; j++) {
            // checks to see if there is a horizontal 4 of a kind
            if (positions[i][j]!='w' && positions[i][j] === positions[i+1][j] && positions[i][j] === positions[i+2][j] && positions[i][j] === positions[i+3][j]) {
                displayWin(whoWins)
            }
        }
    }
    let tie = true
    // runs through all the columns
    for (let i=0; i<positions.length; i++) {
        // runs through all of the rows
        for (let j=0; j<6; j++) {
            // checks to see if current position equals 'w'
            if (positions[i][j]=='w') {
                // sets tie to false
                tie = false
            }
        }
    }
    // if tie is true, calls function displayWin with value "it is a tie!"
    if (tie) displayWin("It is a tie!")
}
// function that displays who won and adds play again button
function displayWin (whoWins) {
    // creates h1 element, sets it to newH2 
    var newH2 = document.createElement('h2');
    // creates a button element, sets it to newButton
    var newButton = document.createElement('button');
    // changes id of new button to 'reset'
    newButton.id = 'reset'
    // if it is red's turn, sets newH2 font color to red
    if (turn) {
        newH2.style.color = "#800000"
    }
    // if it is black's turn, sets newH2 font color to black
    else {
        newH2.style.color = "#141414"
    }
    // sets newText to whoWins variable
    var newText = document.createTextNode(whoWins);
    // creates new text node for try again button
    var newText2 = document.createTextNode("Play Again?");
    // appends text nodes to new button and h2
    newButton.appendChild(newText2)
    newH2.appendChild(newText);
    // adds the new elements to 'winner' div
    var destination = document.getElementById('winner');
    destination.appendChild(newH2);
    destination.appendChild(newButton);
    // runs the function lockGame
    lockGame()
    // adds a click event lister to the new button that runs reset function
    document.getElementById('reset').addEventListener('click', reset);
}
// locks the game up so that no more pieces can be added
function lockGame() {
    // removes click event listener from each column
    columns.forEach (column => {
        column.removeEventListener('click', clickedColumn);
    })
    // removes mouseover event listener for each column
    columns.forEach (column => {
        column.removeEventListener('mouseover', showCoin);
    })
    // removes mouseout event listener for each column
    columns.forEach (column => {
        column.removeEventListener('mouseout', hideCoin);
    })
}
// function that reloads the page
function reset () {
    releaseCoins()
    
}
// function that releases coins from game
function releaseCoins() {
    // sets all box divs to boxes array
    let boxes = document.querySelectorAll(".box");
    // initializes pos array
    let pos = []
    // loops through boxes array
    for (let i=0; i<boxes.length; i++) {
        // checks to see if there is a disk in the current box
        if (boxes[i].lastElementChild) {
            // sets the value of each position in the pos array to 0
            pos[i] = 0
        }
    }
    // sets a setInterval
    var myVar = setInterval(myTimer, 1)
    // starts the timer
    function myTimer () { 
        // loops through the boxes
        for (let j=0; j<boxes.length; j++) {
            // checks to see if the pos values have reached 1000
            if (pos[j]>750) {
                // clears the time interval
                clearInterval(myVar);
                // reloads the page
                window.location.reload();
            } else {
                // checks to see if there is a disk in the current box
                if (boxes[j].lastElementChild) {
                    // adds 1 to the pos array value associated with the current box
                    pos[j]+=2
                    // sets the current box's top position value to the pos array value associated with it
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