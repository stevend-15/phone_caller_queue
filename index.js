/*import './index.css';*/

function addNewCaller() {
    var callerContainer = document.getElementById("callerContainer")
    var square = document.createElement('div');
    square.className = 'square';

    /*
    square.style.width = '120px'
    square.style.height = '120px'
    square.style.display = 'flex';
    square.style.flexDirection = 'row';
    square.style.justifyContent = 'start';
    square.style.alignItems = 'center';
    */

    var arrow = document.createElement('p')
    arrow.innerHTML="&#x2192";
    arrow.style.fontSize="xx-large";

    callerContainer.appendChild(arrow)
    callerContainer.appendChild(square);
}

function addArrow() {

    var callerContainer = document.getElementById("callerContainer");
    var lastChild = callerContainer.lastElementChild;

    var arrow = document.createElement('arrow')
    arrow.className = 'arrow';
    callerContainer.appendChild(arrow)

}

