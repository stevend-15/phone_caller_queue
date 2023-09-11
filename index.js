//TODO: make this method an instance method for caller
function appendCaller() {

    var callerList = document.querySelectorAll('div.square');
    var id = "caller" + String(callerList.length);

    var caller = new Caller(id, "No name", "No loc");
    localStorage.setItem(id, caller)

    var callerContainer = document.getElementById("callerContainer")
    var linkContainer = initLink();
    var square = initSquare(id);
    callerContainer.appendChild(linkContainer);
    callerContainer.appendChild(square);
    localStorage.setItem("callerContainer", callerContainer);


    //update num callers display
    var callerHead = document.getElementById("callerHead");
    if (callerHead) {
        var numCallers = getNumCallers();
        callerHead.innerHTML  = "Callers(" + numCallers + ")"; 
    }


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

    //TODO: make this method an instance method for caller
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


function initSquare(id) {

    var square = document.createElement('div');
    square.className = 'square';
    square.id = id;

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
    var justListeningButton = document.createElement('button');
    justListeningButton.innerHTML = "Just Listening";
    var currentSpeakerButton = document.createElement('button');
    currentSpeakerButton.innerHTML = "Current Speaker";

    nominalButton.addEventListener("click", 
        (event) => {
            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "aquamarine";

            var callerObj = localStorage.getItem(parentSquare.id);
            callerObj.status = "nominal";
            localStorage.setItem(callerObj.id, callerObj);
        }
    )

    missingButton.addEventListener("click", 
        (event) => {
            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "yellow";

            var callerObj = localStorage.getItem(parentSquare.id);
            callerObj.status = "missing";
            localStorage.setItem(callerObj.id, callerObj);
        }
    )

    droppedButton.addEventListener("click", 
        (event) => {
            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "red";

            var callerObj = localStorage.getItem(parentSquare.id);
            callerObj.status = "dropped";
            localStorage.setItem(callerObj.id, callerObj);
        }
    )

    justListeningButton.addEventListener("click", 
        (event) => {
            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "grey";

            var callerObj = localStorage.getItem(parentSquare.id);
            callerObj.status = "justListening";
            localStorage.setItem(callerObj.id, callerObj);
        }
    )

    currentSpeakerButton.addEventListener("click", 
        (event) => {
            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "purple";

            var callerObj = localStorage.getItem(parentSquare.id);
            callerObj.status = "currentSpeaker";
            localStorage.setItem(callerObj.id, callerObj);
        }
    )

    statusDiv.appendChild(nominalButton);
    statusDiv.appendChild(missingButton);
    statusDiv.appendChild(droppedButton);
    statusDiv.appendChild(justListeningButton);
    statusDiv.appendChild(currentSpeakerButton);

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

            var parentSquare = event.target.parentElement.parentElement;
            var callerObj = localStorage.getItem(parentSquare.id);
            callerObj.name = callerName;
            localStorage.setItem(parentSquare.id, callerObj);
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

            var parentSquare = event.target.parentElement.parentElement;
            var callerObj = localStorage.getItem(parentSquare.id);
            callerObj.loc = callerLoc;
            localStorage.setItem(parentSquare.id, callerObj);
        })

    inputDiv.appendChild(callerLocLabel)
    inputDiv.appendChild(callerLocField)

    return inputDiv;

}


class Caller {
    constructor(id, name, loc, prev) {

        this.id = id;
        this.name = name;
        this.loc = loc;
        var status = "nominal";
        this.prev = prev;
        var next = null;
    }
}


function clearData() {
    localStorage.clear();
    var callerContainer = document.getElementById("callerContainer");
    callerContainer.remove();
    window.location.reload();
}

window.addEventListener("beforeunload", function() {

    var callerContainer = this.localStorage.getItem("callerContainer");
    console.log("callerContainer: " + callerContainer);
    console.log("typeof(callerContainer): " + typeof(callerContainer));
    if (callerContainer != null) {
        var callerContainer = document.getElementById("callerContainer").outerHTML;
        localStorage.setItem("callerContainer", callerContainer);
    }
}
)


function getNumCallers() {

    return document.querySelectorAll('div.square').length;

}


var callerHead = document.getElementById("callerHead");
if (callerHead) {
    var numCallers = getNumCallers();
    callerHead.innerHTML  = "Callers(" + numCallers + ")"; 
}
