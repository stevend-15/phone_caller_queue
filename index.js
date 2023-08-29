/*import './index.css';*/

function addNewCaller() {

    var callerContainer = document.getElementById("callerContainer")
    var square = document.createElement('div');
    square.className = 'square';

    var callerNameField = document.createElement('input')
    callerNameField.setAttribute("type", "text") 
    callerNameField.style.width = "80%";
    square.appendChild(callerNameField)

    var callerLocField = document.createElement('input')
    callerLocField.setAttribute("type", "text") 
    callerLocField.style.width = "80%";
    square.appendChild(callerLocField)

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
