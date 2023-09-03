/*import './index.css';*/

function appendCaller() {

    var callerContainer = document.getElementById("callerContainer")
    var arrowContainer = initLink();
    var square = initSquare();
    callerContainer.appendChild(arrowContainer);
    callerContainer.appendChild(square);

}


/*
    A link consists of an arrow and a show/hide button b/w callers
*/
function initLink() {

    var linkContainer = document.createElement('div')
    linkContainer.className = 'container';

    var arrow = document.createElement('div')
    arrow.className = 'arrow';
    arrow.innerHTML="&#x2192";
    linkContainer.appendChild(arrow)

    var insertCallerDiv = document.createElement('div')
    insertCallerDiv.className = "action";

    var insertCallerButton = document.createElement('button')
    insertCallerButton.innerHTML = "Insert new caller";
    insertCallerButton.style.opacity = 0;
    insertCallerDiv.appendChild(insertCallerButton);
    linkContainer.appendChild(insertCallerDiv);

    insertCallerDiv.addEventListener("mouseover", 
        (event) => {event.target.style.opacity = 1;}
    );

    insertCallerDiv.addEventListener("mouseout", 
        (event) => {event.target.style.opacity = 0;}
    );

    insertCallerButton.addEventListener("click", 
        (event) => {

            var linkContainer = event.target.parentElement.parentElement;
            var square = initSquare();
            var link = initLink();
            linkContainer.after(square);
            square.after(link);

        }
    );

    return linkContainer;

}


function initSquare() {

    var square = document.createElement('div');
    square.className = 'square';

    var br = document.createElement('br')

    inputBoxDiv = initInputBoxes(br)
    square.appendChild(inputBoxDiv)

    kebab = initKebab();
    square.appendChild(kebab);

    return square;

}

function initKebab() {

    var kebabDiv = document.createElement('div')
    kebabDiv.className = 'kebab';

    /* 3 - dot icons*/
    //kebabDiv

    /* caller status options */
    var dropdown = document.createElement('ul')
    dropdown.className = 'dropdown';

    nominalStat = document.createElement('li')
    dropdown.appendChild(nominalStat)
    missingStat = document.createElement('li')
    dropdown.appendChild(missingStat)
    droppedStat = document.createElement('li')
    dropdown.appendChild(droppedStat)

    kebabDiv.appendChild(dropdown)

    //kebabDiv.appendChild(kebab)

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