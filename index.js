/*
    TODO: make a whole website out of this project. 
    Make a leaderboard, streak counter, etc. for these phone call 
    participants
*/

var NUM_ELAPSED_CALLERS = 0;

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


function appendCaller(target) {

    var id = "caller" + String(NUM_ELAPSED_CALLERS);

    var tailSquare = getTailSquare();
    var prevCallerID = tailSquare.id;

    var caller = new Caller(id, null, null, prevCallerID);
    localStorage.setItem(id, JSON.stringify(caller));

    var prevCaller = JSON.parse(localStorage.getItem(prevCallerID))
    prevCaller.next = id;
    localStorage.setItem(prevCallerID, JSON.stringify(prevCaller));


    var callerContainer = document.getElementById("callerContainer");
    var linkContainer = initLink();
    var square = initSquare(id);
    var plusButton = initPlusButton("append");

    target.remove(); //remove old plus button for arrow & new plus button
    callerContainer.appendChild(linkContainer);
    callerContainer.appendChild(square);
    callerContainer.appendChild(plusButton);

    localStorage.setItem("callerContainer", callerContainer);

    updateNumCallers();
    NUM_ELAPSED_CALLERS +=1;
    //console.log("NUM_ELAPSED_CALLERS is now " + NUM_ELAPSED_CALLERS);

}


function delCaller(ev) {

    var delSquare = ev.target.parentElement;
    var delCaller = JSON.parse(localStorage.getItem(delSquare.id));
    //console.log("Deleting caller " + delCaller.id);
    //console.log("delCaller obj: " + JSON.stringify(delCaller));

    var nextCaller = JSON.parse(localStorage.getItem(delCaller.next));
    //console.log("nextCaller: " + localStorage.getItem(delCaller.next));
    //console.log("typeof(nextCaller): " + typeof(nextCaller));

    var prevCaller = JSON.parse(localStorage.getItem(delCaller.prev));
    //console.log("prevCaller: " + prevCaller);
    //console.log("typeof(prevCaller): " + typeof(prevCaller));

    if (nextCaller) {
        console.log("nextCaller is some form of true");
        prevCaller.next = nextCaller.id;
        console.log("prevCaller.next is now " + prevCaller.next);
        nextCaller.prev = prevCaller.id;
        console.log("nextCaller.prev is now " + nextCaller.prev);
        localStorage.setItem(nextCaller.id, JSON.stringify(nextCaller));
        localStorage.setItem(prevCaller.id, JSON.stringify(prevCaller));
    }
    else {
        console.log("nextCaller is some form of false");
        console.log("trying to remove the tail square...");
        var newTailArrow = delSquare.previousSibling;
        prevCaller.next = null;
        console.log("prevCaller.next is now " + prevCaller.next);
        localStorage.setItem(prevCaller.id, JSON.stringify(prevCaller));
    }


    localStorage.removeItem(delCaller.id);

    //remove the actual html elements
    var linkContainer = delSquare.nextElementSibling;
    delSquare.remove();
    linkContainer.remove();

    //if we removed tail square, remove old arrow and 
    //re-append plus button to new tail
    if (!nextCaller) {
        var callerContainer = document.getElementById("callerContainer");
        var plusButton = initPlusButton();
        newTailArrow.remove();
        callerContainer.appendChild(plusButton);
    }

    updateNumCallers();

}

/*
    A link consists of arrow and  show/hide plus button b/w callers
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

    //var plusButton = initPlusButton("insert");

    linkContainer.appendChild(arrow);
    //linkContainer.appendChild(plusButton);

    return linkContainer;
}


function initSquare(id) {

    var square = document.createElement('div');
    square.className = 'square';
    square.id = id;

    inputBoxDiv = initInputBoxes(id);
    square.appendChild(inputBoxDiv);

    var statusButtons = initStatusButtons();
    statusButtons.style.opacity = 0;
    square.appendChild(statusButtons);

    //square.appendChild(initDelCallerButton());

    square.addEventListener("mouseenter", (event) => {

        var statusDiv = event.target.getElementsByClassName("statuses")[0];
        statusDiv.style.opacity = 1;
    })

    square.addEventListener("mouseleave", (event) => {

        statusDiv = event.target.getElementsByClassName("statuses")[0];
        statusDiv.style.opacity = 0;
    })

    return square;

}

function initStatusButton(innerTxt) {

    var button = document.createElement('button');
    button.innerText = innerTxt;
    button.type = 'button';

    return button;
}

function initStatusButtons() {

    var statusDiv = document.createElement('div')
    statusDiv.className = 'statuses';

    //init buttons
    var nominalButton = initStatusButton("Nominal");
    nominalButton.setAttribute("disabled", "disabled");
    var missingButton = initStatusButton("Missing");
    var currentSpeakerButton = initStatusButton("Speaking")
    var finishedButton = initStatusButton("Finished")

    //add event listeners
    nominalButton.addEventListener("click", 
        (event) => {

            updateDisabledButton(event);

            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "aquamarine";

            var callerObj = JSON.parse(localStorage.getItem(parentSquare.id));
            callerObj.status = "nominal";
            localStorage.setItem(callerObj.id, JSON.stringify(callerObj));
        }
    )

    missingButton.addEventListener("click", 
        (event) => {
            
            updateDisabledButton(event);

            //update the square color
            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "yellow";

            //update the object in memory
            var callerObj = JSON.parse(localStorage.getItem(parentSquare.id));
            callerObj.status = "missing";
            localStorage.setItem(callerObj.id, JSON.stringify(callerObj));
        }
    )

    //Current speaker behavior is Singleton across application
    currentSpeakerButton.addEventListener("click", 
        (event) => {

            updateDisabledButton(event);

            var parentSquare = event.target.parentElement.parentElement;
            var curr = JSON.parse(localStorage.getItem("hostSquare"));
            while (curr) {


                if (curr.status == "currentSpeaker" && 
                    curr.id != parentSquare.id) {
                    var currSpeakerSquare = document.getElementById(curr.id);

                    //update the status button
                    var statusButtonsDiv = currSpeakerSquare.children[1];
                    console.log("statusButtonsDiv.className: " + statusButtonsDiv.className);
                    var statusButtons = statusButtonsDiv.children;
                    statusButtons[0].setAttribute("disabled", "disabled");
                    statusButtons[2].removeAttribute("disabled");

                    currSpeakerSquare.style.backgroundColor = "aquamarine";
                }

                curr = JSON.parse(localStorage.getItem(curr.next));
                
            }

            parentSquare.style.backgroundColor = "purple";

            var callerObj = JSON.parse(localStorage.getItem(parentSquare.id));
            callerObj.status = "currentSpeaker";
            localStorage.setItem(callerObj.id, JSON.stringify(callerObj));

        }
    )

    finishedButton.addEventListener("click", 
        (event) => {

            updateDisabledButton(event);

            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "gray";

            var callerObj = JSON.parse(localStorage.getItem(parentSquare.id));
            callerObj.status = "finished";
            localStorage.setItem(callerObj.id, JSON.stringify(callerObj));
        }
    )

    //add the del caller button
    var delButton = initDelCallerButton();

    //add buttons to div
    statusDiv.appendChild(nominalButton);
    statusDiv.appendChild(missingButton);
    statusDiv.appendChild(currentSpeakerButton);
    statusDiv.appendChild(finishedButton);
    statusDiv.appendChild(delButton);

    return statusDiv;

}


function updateDisabledButton(ev) {

    //enable/disable status buttons
    var clickedButton = ev.target;
    var statusButtonsDiv = ev.target.parentElement;
    console.log("statusButtonsDiv after click: " + statusButtonsDiv.className);
    var statusButtons = statusButtonsDiv.children;
    console.log("statusButtons: " + statusButtons);

    for (let button of statusButtons) {

        console.log("button.disabled?: " + button.disabled);
        if (button.disabled) {
            button.removeAttribute("disabled")
            break;
        }
    }

    clickedButton.setAttribute("disabled", "disabled");

}


function initInputBox(id, placeholder) {

    var inputBox = document.createElement('input')
    inputBox.setAttribute("class", "input");
    inputBox.setAttribute("type", "text") 
    inputBox.setAttribute("id", id + "Name")
    inputBox.setAttribute("placeholder", placeholder);

    return inputBox;

}


function initInputBoxes(callerID) {

    var inputDiv = document.createElement('div')
    inputDiv.className = "inputs";

    var callerNameField = initInputBox(callerID, "Name");
    var callerLocField = initInputBox(callerID, "Location");

    callerNameField.addEventListener("change", 
        (event) => {

            var callerName = event.target.value;
            event.target.innerText = callerName;

            var parentSquare = event.target.parentElement.parentElement;
            console.log("parentSquare.id: " + parentSquare.id);

            var callerObj = JSON.parse(
                localStorage.getItem(parentSquare.id));
            callerObj.name = callerName;
            localStorage.setItem(parentSquare.id, JSON.stringify(callerObj));
        })

    inputDiv.appendChild(callerNameField)

    callerLocField.addEventListener("change", 
        (event) => {
            var callerLoc = event.target.value;
            event.target.innerText = callerLoc;

            var parentSquare = event.target.parentElement.parentElement;
            console.log("parentSquare.id: " + parentSquare.id);

            var callerObj = JSON.parse(
                localStorage.getItem(parentSquare.id));
            callerObj.loc = callerLoc;
            localStorage.setItem(parentSquare.id, JSON.stringify(callerObj));

        })

    inputDiv.appendChild(callerLocField)

    return inputDiv;

}


function initDelCallerButton() {

    var delButton = document.createElement('button');
    delButton.className = "resetButton";
    delButton.innerText = 'Delete';
    delButton.type = 'button';

    delButton.addEventListener("click", (event) => {
        
        //TODO: make this a multiline str
        var confirmed = confirm("Are you sure you want to delete this caller?");

        if (confirmed) {
            delCaller(event);
        }
    })


    return delButton;

}

function clearData() {
    localStorage.clear();
    var callerContainer = document.getElementById("callerContainer");
    callerContainer.remove();
    window.location.reload();
}

window.addEventListener("beforeunload", function() {

    console.log("Page refreshed triggered")
    var callerContainer = this.localStorage.getItem("callerContainer");
    console.log("callerContainer:\n\n" + callerContainer);
    console.log("typeof(callerContainer): " + typeof(callerContainer));
    if (callerContainer != null) {
        console.log("callerContainer was not null\n")
        var callerContainer = document.getElementById("callerContainer").outerHTML;
        localStorage.setItem("callerContainer", callerContainer);
    }
}
)


function getNumCallers() {

    return document.querySelectorAll('div.square').length;

}


function getTailSquare() {

    var squares = document.querySelectorAll('div.square');
    var tailSquare = squares[squares.length -1]
    return tailSquare;
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


function resetCallers() {

    var confirmed = confirm("Are you sure you want to reset all callers?");
    console.log("confirmed? : " + confirmed);

    if (confirmed) {
        clearData();
    }
    
}

updateNumCallers();



function loadCallers() {

    var curr = JSON.parse(localStorage["hostSquare"]);

    while (curr) {

        console.log("curr: " + curr.id)
        curr = curr.next;
    }
}

//TODO: maybe remove all this and warn if user tries to refresh page
//TODO: loop through localStorage to recreate everything
//TODO: how can I get the 'you may lose input data warning if you refresh this page'?
function createCallerContainer() {

    //always init the container and host square

    var docBody = document.getElementsByTagName("body").item(0);

    var callerContainer = document.createElement('div');
    callerContainer.className = 'callerContainer';
    callerContainer.id = 'callerContainer';

    var hostSquare = document.createElement('div');
    hostSquare.className = 'square';
    hostSquare.id = 'hostSquare';
    hostSquare.innerText = "Host";
    hostSquare.style.textAlign = 'center';

    callerContainer.appendChild(hostSquare);

    var plusButton = initPlusButton("append");
    callerContainer.appendChild(plusButton);


    docBody.appendChild(callerContainer);


    var hostSquareObj = JSON.parse(localStorage["hostSquare"])
    console.log("hostSquareObj: " + hostSquareObj);
    console.log("typeof(hostSquareObj): " + typeof(hostSquareObj));
    console.log("Is hostSquareObj.next == null? : " + hostSquareObj.next === null);
    console.log("hostSquareObj.next): " + hostSquareObj.next);
    console.log("typeof(hostSquareObj.next): " + typeof(hostSquareObj.next));

    if (hostSquareObj.next){
        console.log("\n\nhostSquareObj.next is some form of true")
        loadCallers()
    } 

    //check if there is caller data in local storage
    /*
    var cachedContainer = localStorage["callerContainer"];

    if (cachedContainer != 'null' && cachedContainer !== undefined)  {

        var range = document.createRange();
        range.selectNodeContents(docBody);
        var frag = range.createContextualFragment(cachedContainer);
        docBody.appendChild(frag);
        updateNumCallers();

    } 
    */
}


localStorage.setItem("hostSquare", 
    JSON.stringify(new Caller("hostSquare", null, null, null)));