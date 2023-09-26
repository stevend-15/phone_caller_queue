/*
    TODO: make a whole website out of this project. 
    Make a leaderboard, streak counter, etc. for these phone call 
    participants
*/


class Caller {

    constructor(id, name, loc, prev) {

        this.id = id;
        this.name = name;
        this.loc = loc;
        this.status = "nominal";
        this.prev = prev;
        this.next = null;
    }

}



//TODO: make this method an instance method for caller
function appendCaller(target) {

    var numCallers = getNumCallers();
    var id = "caller" + String(numCallers);

    var caller = new Caller(id, null, null, "caller" + String(numCallers - 1));
    console.log("typeof(caller): " + typeof(caller));
    console.log("trying to stringify caller obj: " + JSON.stringify(caller));

    localStorage.setItem(id, JSON.stringify(caller));

    var callerContainer = document.getElementById("callerContainer");
    var linkContainer = initLink();
    var square = initSquare(id);
    var plusButton = initPlusButton("append");

    target.remove();
    callerContainer.appendChild(linkContainer);
    callerContainer.appendChild(square);
    callerContainer.appendChild(plusButton);

    localStorage.setItem("callerContainer", callerContainer);

    updateNumCallers();

}


/*
    A link consists of an arrow and a show/hide button b/w callers
*/
function initLink() {

    var linkContainer = document.createElement('div')
    linkContainer.className = 'container';

    var insertCallerDiv = document.createElement('div')
    insertCallerDiv.className = "action";

    var arrow = document.createElement('div')
    arrow.className = 'arrow';
    arrow.innerHTML="&#x2192";
    linkContainer.appendChild(arrow)

    var plusButton = initPlusButton("insert");

    linkContainer.appendChild(arrow);
    linkContainer.appendChild(plusButton);

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
    callerNameField.setAttribute("placeholder", "Caller name");
    callerNameField.style.width = "80%";

    callerNameField.addEventListener("change", 
        (event) => {

            var callerName = event.target.value;

            var parentSquare = event.target.parentElement.parentElement;
            console.log("parentSquare.id: " + parentSquare.id);

            var callerObj = JSON.parse(
                localStorage.getItem(parentSquare.id));
            callerObj.name = callerName;
            console.log("Updated " + callerObj.id + "'s name")
            localStorage.setItem(parentSquare.id, JSON.stringify(callerObj));
        })

    inputDiv.appendChild(callerNameField)
    inputDiv.appendChild(lineBr)
    inputDiv.appendChild(lineBr)

    var callerLocField = document.createElement('input')
    callerLocField.setAttribute("type", "text") 
    callerLocField.setAttribute("id", "callerLoc")
    callerLocField.setAttribute("placeholder", "Caller location");
    callerLocField.style.width = "80%";

    
    callerLocField.addEventListener("change", 
        (event) => {
            var callerLoc = event.target.value;

            var parentSquare = event.target.parentElement.parentElement;
            console.log("parentSquare.id: " + parentSquare.id);

            var callerObj = JSON.parse(
                localStorage.getItem(parentSquare.id));
            callerObj.loc = callerLoc;
            console.log("Updated " + callerObj.id + "'s loc")
            localStorage.setItem(parentSquare.id, JSON.stringify(callerObj));

        })

    inputDiv.appendChild(callerLocField)

    return inputDiv;

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


function updateNumCallers() {

    var callerHead = document.getElementById("callerHead");
    if (callerHead) {
        var numCallers = getNumCallers();
        callerHead.innerHTML  = "Callers(" + numCallers + ")"; 
    }

}

function initPlusButton(context) {

    var plusButton = document.createElement('div');
    plusButton.classList.add(...['plus', 'radius']);

    if (context == "insert") {
        //TODO: add mouseover/mouseout event listeners here?
        plusButton.addEventListener("click", (event) => insertCaller(event.target));
    }
    else {
        plusButton.addEventListener("click", (event) => appendCaller(event.target));
    }

    return plusButton;

}

updateNumCallers();


//TODO: maybe remove all this and just make a warning if the user tries to refresh page
function createCallerContainer() {

    var cachedContainer = localStorage["callerContainer"];
    var docBody = document.getElementsByTagName('body').item(0);

    if (cachedContainer != 'null' && cachedContainer !== undefined)  {

        var range = document.createRange();
        range.selectNodeContents(docBody);
        var frag = range.createContextualFragment(cachedContainer);
        docBody.appendChild(frag);

    } else {

        var defaultContainer = document.createElement('div');
        defaultContainer.className = 'callerContainer';
        defaultContainer.id = 'callerContainer';

        var hostSquare = document.createElement('div');
        hostSquare.className = 'square';
        hostSquare.id = 'hostSquare';

        var hostSquareTxt = document.createElement('p');
        hostSquareTxt.style.textAlign = 'center';
        hostSquareTxt.innerText = 'Host';

        hostSquare.appendChild(hostSquareTxt);
        defaultContainer.appendChild(hostSquare);

        var plusButton = initPlusButton("append");
        defaultContainer.appendChild(plusButton);

        docBody.appendChild(defaultContainer);
    }
}