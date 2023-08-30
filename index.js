/*import './index.css';*/

function addNewCaller() {

    var callerContainer = document.getElementById("callerContainer")
    var square = document.createElement('div');
    square.className = 'square';

    var callerNameField = document.createElement('input')
    callerNameField.setAttribute("type", "text") 
    callerNameField.setAttribute("id", "callerName")
    callerNameField.style.width = "80%";

    var callerNameLabel = document.createElement('label')
    callerNameLabel.setAttribute("for", "callerName")
    callerNameLabel.innerHTML="Caller Name"

    square.append(callerNameLabel)
    square.appendChild(callerNameField)

    var callerLocField = document.createElement('input')
    callerLocField.setAttribute("type", "text") 
    callerLocField.setAttribute("id", "callerLoc")
    callerLocField.style.width = "80%";

    var callerLocLabel = document.createElement('label')
    callerLocLabel.setAttribute("for", "callerLoc")
    callerLocLabel.innerHTML="Caller Loc"

    square.append(callerLocLabel)
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
