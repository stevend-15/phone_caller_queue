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

    target.remove(); //remove the old plus button to make room for 
    callerContainer.appendChild(linkContainer);
    callerContainer.appendChild(square);
    callerContainer.appendChild(plusButton);

    localStorage.setItem("callerContainer", callerContainer);

    updateNumCallers();

}

//TODO: need to handle edge case where the head and tail are adjacent and 
//tail needs to be deleted. 
//Specifically, need to change the link container on the head to just a plus button
function delCaller(ev) {

    var delSquare = ev.target.parentElement;
    //console.log("delSquare: " + delSquare);
    //console.log("delSquare.className: " + delSquare.className);
    var delCaller = JSON.parse(localStorage.getItem(delSquare.id));
    console.log("Deleting caller " + delCaller.id);
    console.log("delCaller obj: " + JSON.stringify(delCaller));

    //var nextCaller = localStorage.getItem(delCaller.next);
    //console.log("nextCaller: " + nextCaller.id);
    var nextCaller = JSON.parse(localStorage.getItem(delCaller.next));
    console.log("nextCaller: " + localStorage.getItem(delCaller.next));
    console.log("typeof(nextCaller): " + typeof(nextCaller));

    var prevCaller = JSON.parse(localStorage.getItem(delCaller.prev));
    console.log("prevCaller: " + prevCaller);
    console.log("typeof(prevCaller): " + typeof(prevCaller));

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
        prevCaller.next = null;
        console.log("prevCaller.next is now " + prevCaller.next);
        localStorage.setItem(prevCaller.id, JSON.stringify(prevCaller));
    }


    localStorage.removeItem(delCaller.id);

    //remove the actual html elements
    var linkContainer = delSquare.nextElementSibling;
    //console.log("linkContainer? : " + linkContainer);
    //console.log("linkContainer.className? : " + linkContainer.className);
    delSquare.remove();
    linkContainer.remove();

}

/*
    A link consists of an arrow and a show/hide plus button b/w callers
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

    inputBoxDiv = initInputBoxes(id);
    square.appendChild(inputBoxDiv);

    var statusButtons = initStatusButtons();
    square.appendChild(statusButtons);

    square.appendChild(initDelCallerButton());

    return square;

}

//TODO: make the current speaker button a Singleton
function initStatusButton(innerTxt) {

    var button = document.createElement('button');
    button.innerText = innerTxt;
    button.type = 'button';

    return button;
}


function initStatusButtons() {

    var statusDiv = document.createElement('div')
    statusDiv.className = 'statuses';

    //init the buttons
    var nominalButton = initStatusButton("Nominal");
    var missingButton = initStatusButton("Missing");
    var currentSpeakerButton = initStatusButton("Current Speaker")
    var finishedButton = initStatusButton("Finished")

    //add the event listeners
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

    //Current speaker behavior is Singleton across application
    currentSpeakerButton.addEventListener("click", 
        (event) => {

            var curr = JSON.parse(localStorage.getItem("hostSquare"));
            while (curr) {


                if (curr.status == "currentSpeaker") {
                    var currSpeakerSquare = document.getElementById(curr.id);
                    currSpeakerSquare.style.backgroundColor = "aquamarine";
                }

                curr = JSON.parse(localStorage.getItem(curr.next));
                
            }

            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "purple";

            var callerObj = JSON.parse(localStorage.getItem(parentSquare.id));
            callerObj.status = "currentSpeaker";
            localStorage.setItem(callerObj.id, JSON.stringify(callerObj));
        }
    )

    finishedButton.addEventListener("click", 
        (event) => {
            var parentSquare = event.target.parentElement.parentElement;
            parentSquare.style.backgroundColor = "gray";

            var callerObj = localStorage.getItem(parentSquare.id);
            callerObj.status = "finished";
            localStorage.setItem(callerObj.id, callerObj);
        }
    )


    //add the buttons to the DOM
    statusDiv.appendChild(nominalButton);
    statusDiv.appendChild(missingButton);
    statusDiv.appendChild(currentSpeakerButton);
    statusDiv.appendChild(finishedButton);

    return statusDiv;

}


function initInputBoxes(callerID) {

    var lineBr = document.createElement('br')

    var inputDiv = document.createElement('div')
    inputDiv.style.float = "left";
    inputDiv.style.width = "50%";

    var callerNameField = document.createElement('input')
    callerNameField.setAttribute("type", "text") 
    callerNameField.setAttribute("id", callerID + "Name")
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
            //console.log("Updated " + callerObj.id + "'s name")
            localStorage.setItem(parentSquare.id, JSON.stringify(callerObj));
        })

    inputDiv.appendChild(callerNameField)
    inputDiv.appendChild(lineBr)
    inputDiv.appendChild(lineBr)

    var callerLocField = document.createElement('input')
    callerLocField.setAttribute("type", "text") 
    callerLocField.setAttribute("id", callerID + "Loc")
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
            //console.log("Updated " + callerObj.id + "'s loc")
            localStorage.setItem(parentSquare.id, JSON.stringify(callerObj));

        })

    inputDiv.appendChild(callerLocField)

    return inputDiv;

}


function initDelCallerButton() {

    var delButton = document.createElement('button');
    delButton.innerText = 'Delete Caller';
    delButton.type = 'button';
    delButton.style.backgroundColor = 'red';
    delButton.style.color = 'white';

    delButton.addEventListener("click", (event) => {
        
        var confirmed = confirm("Are you sure you want to delete this caller?");

        if (confirmed) {
            //console.log("Yes, user wants to delete callr")
            delCaller(event);
            //delCaller()
        }
    })

    //window.confirm("Are you sure you want to delete this caller?")

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