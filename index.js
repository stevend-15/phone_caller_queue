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

    /*
    var kebab = document.querySelector(".kebab"),
    dropdown = document.querySelector(".dropdown");

    kebab.addEventListener("click", function() {
        dropdown.classList.toggle("active");
    });
    */

    var arrow = document.createElement('p')
    arrow.innerHTML="&#x2192";
    arrow.style.fontSize="xx-large";

    callerContainer.appendChild(arrow)
    callerContainer.appendChild(square);
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