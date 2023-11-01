//TODO: make this button type = 'reset'
var lastTime = "0:00";
var interval = null;


function resetTimer() {

    clearInterval(interval);
    var countdown = document.getElementById("countdown");
    countdown.innerHTML = lastTime;

    var decButton = document.getElementById("decTimer");
    decButton.removeAttribute("disabled");
    var incButton = document.getElementById("incTimer");
    incButton.removeAttribute("disabled");

}

function adjustTimer(context) {

    var countdown = document.getElementById("countdown")

    if (countdown.innerText == "TIME") {
        countdown.innerHTML = "0:00";
        return;
    }

    var numMins = parseInt(countdown.innerText.split(":")[0]);

    if (context == "dec" && numMins == 0) {
        console.log("Hey, you can't have negative time!!")
        return;
    } 

    if (context == "inc") {
        numMins = numMins + 1;
    }
    else if (context == "dec") {
        numMins = numMins - 1;
    }
    else {
        console.log("Error, wrong type of adjustment somehow")
    }

    countdown.innerHTML = numMins + ":00";
}

function startTimer() {

    //disable the timer adjustment buttons
    var decButton = document.getElementById("decTimer");
    decButton.setAttribute("disabled", "disabled");
    var incButton = document.getElementById("incTimer");
    incButton.setAttribute("disabled", "disabled");

    //start the timer
    //console.log("Starting timer")
    var countdown = document.getElementById("countdown");
    var numMins = parseInt(countdown.innerText);
    lastTime = numMins + ":00";
    var numSecs = numMins * 60;
    var currentSeconds = new Date().getTime() / 1000;
    //console.log("currentSeconds: " + currentSeconds);
    var timerFinish = currentSeconds + numSecs;
    //console.log("timeFinish: " + timerFinish);


    interval = setInterval(function() {

        var nowSecs = new Date().getTime() / 1000;
        var distance = timerFinish - nowSecs;

        var minutes = Math.floor((distance % 1000/ 60));
        var seconds = Math.floor((distance % 60));

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        let newCountdown = minutes + ":" + seconds 
        countdown.innerHTML = newCountdown;

        if (distance < 0) {
            clearInterval(interval);
            countdown.innerHTML = "TIME";
        }

    }, 1000);
    //console.log("Reached end of startTimer method")

}
