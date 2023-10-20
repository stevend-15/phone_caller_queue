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


function appendCaller(target) {

    //TODO: change this to be TOTAL_NUM_CALLERS constant
    var numCallers = getNumCallers();
    var id = "caller" + String(numCallers);

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
    square.appendChild(statusButtons);

    square.appendChild(initDelCallerButton());

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

            updatedDisabledButton(event);

            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "aquamarine";

            var callerObj = JSON.parse(localStorage.getItem(parentSquare.id));
            callerObj.status = "nominal";
            localStorage.setItem(callerObj.id, JSON.stringify(callerObj));
        }
    )

    missingButton.addEventListener("click", 
        (event) => {
            
            updatedDisabledButton(event);

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
    //TODO: fix status button disabled and current speaker issues 
    currentSpeakerButton.addEventListener("click", 
        (event) => {

            updatedDisabledButton(event);

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

            updatedDisabledButton(event);

            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "gray";

            var callerObj = JSON.parse(localStorage.getItem(parentSquare.id));
            callerObj.status = "finished";
            localStorage.setItem(callerObj.id, JSON.stringify(callerObj));
        }
    )


    //add buttons to div
    statusDiv.appendChild(nominalButton);
    statusDiv.appendChild(missingButton);
    statusDiv.appendChild(currentSpeakerButton);
    statusDiv.appendChild(finishedButton);

    return statusDiv;

}


function updatedDisabledButton(ev) {

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
    //TODO: move these to CSS
    inputDiv.style.float = "left";
    inputDiv.style.width = "50%";


    var callerNameField = initInputBox(callerID, "Name");
    var callerLocField = initInputBox(callerID, "Location");

    callerNameField.addEventListener("change", 
        (event) => {

            var callerName = event.target.value;

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
    delButton.innerText = 'Delete Caller';
    delButton.type = 'button';
    //TODO: move this to CSS
    delButton.style.backgroundColor = 'red';
    delButton.style.color = 'white';

    delButton.addEventListener("click", (event) => {
        
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

updateNumCallers();
localStorage.setItem("hostSquare", JSON.stringify(new Caller("hostSquare", null, null, null)));


//TODO: maybe remove all this and just make a warning if the user tries to refresh page
function createCallerContainer() {

    var cachedContainer = localStorage["callerContainer"];
    var docBody = document.getElementsByTagName('body').item(0);

    if (cachedContainer != 'null' && cachedContainer !== undefined)  {

        var range = document.createRange();
        range.selectNodeContents(docBody);
        var frag = range.createContextualFragment(cachedContainer);
        docBody.appendChild(frag);
        updateNumCallers();

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