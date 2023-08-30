/*import './index.css';*/

function addNewCaller() {

    var callerContainer = document.getElementById("callerContainer")
    var square = document.createElement('div');
    square.className = 'square';

    var br = document.createElement('br')

    var callerNameField = document.createElement('input')
    callerNameField.setAttribute("type", "text") 
    callerNameField.setAttribute("id", "callerName")
    callerNameField.style.width = "80%";

    var callerNameLabel = document.createElement('label')
    callerNameLabel.setAttribute("for", "callerName")
    callerNameLabel.innerHTML="Caller Name"

    square.appendChild(callerNameLabel)
    square.appendChild(callerNameField)
    square.appendChild(br)
    square.appendChild(br)

    var callerLocField = document.createElement('input')
    callerLocField.setAttribute("type", "text") 
    callerLocField.setAttribute("id", "callerLoc")
    callerLocField.style.width = "80%";

    var callerLocLabel = document.createElement('label')
    callerLocLabel.setAttribute("for", "callerLoc")
    callerLocLabel.innerHTML="Caller Loc"

    square.appendChild(callerLocLabel)
    square.appendChild(callerLocField)

    kebab = createKebab();
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

function createKebab() {

    var kebab = document.createElement('kebab')
    var dropdown = document.createElement('ul')

    nominalStat = document.createElement('li')
    dropdown.appendChild(nominalStat)
    missingStat = document.createElement('li')
    dropdown.appendChild(missingStat)
    droppedStat = document.createElement('li')
    dropdown.appendChild(droppedStat)

    kebab.appendChild(dropdown)

    return kebab;

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