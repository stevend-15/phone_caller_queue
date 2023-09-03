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

    var arrContainer = initArrow();
    callerContainer.appendChild(arrContainer);
    callerContainer.appendChild(square);

    var arrows = document.querySelectorAll('div.arrow')
    //console.log("There are " + arrows.length + " arrows on the page")
}


function initArrow() {

    var arrowContainer = document.createElement('div')
    arrowContainer.className = 'container';

    var arrow = document.createElement('div')
    arrow.className = 'arrow';
    arrow.innerHTML="&#x2192";
    arrowContainer.appendChild(arrow)


    var insertCallerDiv = document.createElement('div')
    insertCallerDiv.className = "action";

    var insertCallerButton = document.createElement('button')
    insertCallerButton.innerHTML = "Insert new caller";
    insertCallerButton.onclick = "addNewCaller()"
    insertCallerButton.style.opacity = 0;

    insertCallerDiv.appendChild(insertCallerButton);
    arrowContainer.appendChild(insertCallerDiv);


    insertCallerDiv.addEventListener("mouseover", 
        (event) => {
            event.target.style.opacity = 1;
        }
    );

    insertCallerDiv.addEventListener("mouseout", 
        (event) => {
            event.target.style.opacity = 0;
        }
    );

    return arrowContainer;

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

    var arrContainer= document.querySelector('div.container:hover');
    console.log("Hovering over arrContainerow? : " + arrContainer)
    console.log("arrContainer has " + arrContainer.childNodes.length + " kids")
    var button = arrContainer.lastChild.lastChild;
    console.log("Have button? : " + button)
    button.style.opacity = 1;
}

function arrowMouseOut() {

    var i = 0;
    //var event.target.style.opacity = 0;
    /*
    var arrContainer = document.querySelector('div.container:hover');
    console.log("Hovering out arrContainerow? : " + arrContainer)
    kids = arrContainer.childNodes
    console.log(kids.length + " child nodes in arrow container")

    var button = arrContainer.lastChild.lastChild;
    button.style.opacity = 0;
    */

}