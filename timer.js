//TODO: make this button type = 'reset'
function resetTimer() {

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

    var countdown = document.getElementById("countdown");
    var numMins = parseInt(countdown.innerText);
    var numSecs = numMins * 60;
    var currentSeconds = new Date().getTime() / 1000;
    console.log("currentSeconds: " + currentSeconds);
    var timerFinish = currentSeconds + numSecs;
    console.log("timeFinish: " + timerFinish);


    var interval = setInterval(function() {

        var nowSecs = new Date().getTime() / 1000;
        var distance = timerFinish - nowSecs;

        var minutes = Math.floor((distance % 1000/ 60));
        var seconds = Math.floor((distance % 60));

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        let newCountdown = minutes + ":" + seconds 
        document.getElementById('countdown').innerHTML = newCountdown;

        if (distance < 0) {
            clearInterval(interval);
            //document.getElementById('countdown').innerHTML = "EXPIRED";
            countdown.innerHTML = "TIME";
        }

    }, 1000);

}
