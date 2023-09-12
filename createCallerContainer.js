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

    var plusButton = document.createElement('div');
    plusButton.classList.add(...['plus', 'radius']);
    defaultContainer.appendChild(plusButton);

    docBody.appendChild(defaultContainer);
}
