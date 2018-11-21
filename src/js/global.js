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

function addCoin(row, column) {
    
}

function clickedColumn (e) {
    hideCoin(e)
    turn = !turn
    let column = parseInt(e.currentTarget.id.slice(1,2))
    
    if (currentSetUp[column-1]>0) {
        addCoin(currentSetUp[column-1], column)
    }
    console.log(currentSetUp)
    currentSetUp[column-1]--
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