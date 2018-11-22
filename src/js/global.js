let columns = document.querySelectorAll(".column");
let turn = false;
let currentSetUp = [6,6,6,6,6,6,6]

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
    console.log(pos)
    var id = setInterval(frame, 5);
    function frame() {
        if (pos == 0) {
            clearInterval(id);
        } else {
            pos++; 
            newElement.style.top = pos + 'px';
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