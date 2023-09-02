/*import './index.css';*/

function addNewCaller() {

    var callerContainer = document.getElementById("callerContainer")
    var square = document.createElement('div');
    square.className = 'square';

    var br = document.createElement('br')

    inputBoxDiv = initInputBoxes(br)
    square.appendChild(inputBoxDiv)

    kebab = initKebab();
    square.appendChild(kebab);

    var arrow = document.createElement('div')
    arrow.className = 'arrow';
    arrow.innerHTML="&#x2192";
    arrow.addEventListener("mouseover", arrowMouseOver)
    arrow.addEventListener("mouseout", arrowMouseOut)

    callerContainer.appendChild(arrow)
    callerContainer.appendChild(square);

    var arrows = document.querySelectorAll('div.arrow')
    console.log("There are " + arrows.length + " arrows on the page")
}

function initKebab() {

    var kebabDiv = document.createElement('div')
    kebabDiv.style.float = "right";
    //kebabDiv.style.width = "20%";
    var kebab = document.createElement('kebab')
    var dropdown = document.createElement('ul')

    nominalStat = document.createElement('li')
    dropdown.appendChild(nominalStat)
    missingStat = document.createElement('li')
    dropdown.appendChild(missingStat)
    droppedStat = document.createElement('li')
    dropdown.appendChild(droppedStat)

    kebab.appendChild(dropdown)

    kebabDiv.appendChild(kebab)

    return kebabDiv;

    /*
    var kebab = document.querySelector(".kebab"),
    middle = document.querySelector(".middle"),
    cross = document.querySelector(".cross"),
    dropdown = document.querySelector(".dropdown");

    kebab.addEventListener("click", function() {
        middle.classList.toggle("active");
        cross.classList.toggle("active");
        dropdown.classList.toggle("active");
    });
    */

}



function initInputBoxes(lineBr) {

    var inputDiv = document.createElement('div')
    inputDiv.style.float = "left";
    inputDiv.style.width = "60%";

    var callerNameField = document.createElement('input')
    callerNameField.setAttribute("type", "text") 
    callerNameField.setAttribute("id", "callerName")
    callerNameField.style.width = "80%";

    var callerNameLabel = document.createElement('label')
    callerNameLabel.setAttribute("for", "callerName")
    callerNameLabel.innerHTML="Caller Name"

    inputDiv.appendChild(callerNameLabel)
    inputDiv.appendChild(callerNameField)
    inputDiv.appendChild(lineBr)
    inputDiv.appendChild(lineBr)

    var callerLocField = document.createElement('input')
    callerLocField.setAttribute("type", "text") 
    callerLocField.setAttribute("id", "callerLoc")
    callerLocField.style.width = "80%";

    var callerLocLabel = document.createElement('label')
    callerLocLabel.setAttribute("for", "callerLoc")
    callerLocLabel.innerHTML="Caller Loc"

    inputDiv.appendChild(callerLocLabel)
    inputDiv.appendChild(callerLocField)

    return inputDiv;

}

/* Arrow button listener functions */
function arrowMouseOver() {
    var arr = document.querySelector(':hover')
    var insertCallerDiv = document.createElement('div')
    insertCallerDiv.className = "action";

    var insertCallerButton = document.createElement('button')
    insertCallerButton.innerHTML = "Click to insert new caller";
    insertCallerButton.onclick = "addNewCaller()"
    console.log("Are we hovering over an arrow? : " + arr)

    insertCallerDiv.appendChild(insertCallerButton);
    arr.appendChild(insertCallerButton);
}

function arrowMouseOut() {

    var arr = document.querySelector(':hover')
    lastChild = arr.lastChild;
    arr.removeChild(lastChild);

    kids = arr.childNodes
    console.log("There are " + kids.length + " child nodes from the hovered arrow")

}