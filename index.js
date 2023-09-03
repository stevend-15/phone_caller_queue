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

    inputBoxDiv = initInputBoxes()
    square.appendChild(inputBoxDiv)

    var statusButtons = initStatusButtons();
    square.appendChild(statusButtons);

    return square;

}

function initStatusButtons() {

    var statusDiv = document.createElement('div')
    statusDiv.className = 'statuses';

    var nominalButton = document.createElement('button');
    nominalButton.innerText = "Nominal";
    var missingButton = document.createElement('button');
    missingButton.innerText = "Missing";
    var droppedButton = document.createElement('button');
    droppedButton.innerText = "Dropped";

    nominalButton.addEventListener("click", 
        (event) => {
            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "aquamarine";
        }
    )


    missingButton.addEventListener("click", 
        (event) => {
            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "yellow";
        }
    )

    droppedButton.addEventListener("click", 
        (event) => {
            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "red";
        }
    )

    statusDiv.appendChild(nominalButton);
    statusDiv.appendChild(missingButton);
    statusDiv.appendChild(droppedButton);

    return statusDiv;

}


function initInputBoxes() {

    var lineBr = document.createElement('br')

    var inputDiv = document.createElement('div')
    inputDiv.style.float = "left";
    inputDiv.style.width = "50%";

    var callerNameField = document.createElement('input')
    callerNameField.setAttribute("type", "text") 
    callerNameField.setAttribute("id", "callerName")
    callerNameField.style.width = "80%";

    var callerNameLabel = document.createElement('label')
    callerNameLabel.setAttribute("for", "callerName")
    callerNameLabel.innerHTML="Caller Name"

    callerNameField.addEventListener("change", 
        (event) => {
            var callerName = event.target.value;
            console.log("callerName: " + callerName)
        })

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
    
    callerLocField.addEventListener("change", 
        (event) => {
            var callerLoc = event.target.value;
            console.log("callerLoc: " + callerLoc)
        })

    inputDiv.appendChild(callerLocLabel)
    inputDiv.appendChild(callerLocField)

    return inputDiv;

}


class Caller {
    constructor(name, loc, prev) {
        //id = ??
        this.name = name;
        this.loc = loc;
        var status = "nominal";
        this.prev = prev;
        var next = null;
    }
}