let columns = document.querySelectorAll(".column");
let turn = false;

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
    currentColumn.firstElementChild.removeChild(currentColumn.firstElementChild.firstElementChild)
}

// function used to display a coin
function display (color, destination) {
    // creates p element and adds x to it 
    var newElement = document.createElement('div');
    newElement.classList.add(color)
    // adds p element to ans div
    destination.appendChild(newElement);
}

function clickedColumn (e) {
    turn = !turn
    
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