function resetTimer() {

}


function startTimer() {

    var timeQ = parseInt(getTimeQuantity()) * 60;
    var currentSeconds = new Date().getTime() / 1000;
    var timerFinish = currentSeconds + timeQ;


    var interval = setInterval(function(timeQ) {

        var now = new Date().getTime() / 1000;
        var distance = timerFinish - now;

        var minutes = Math.floor((distance % 1000/ 60));
        var seconds = Math.floor((distance % 60));

        let newCountdown = minutes + ":" + seconds 
        document.getElementById('countdown').innerHTML = newCountdown;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = "EXPIRED";
        }



    }, 1000);

}


function getTimeQuantity() {

    //get the timer form data
    var timeField = document.getElementById('timeQuantity').value;
    console.log("timeField.value: " + timeField);

    //get the timeQuantity from GET
    let params = new URLSearchParams(location.search);
    var timeQuantity = params.get('timeQuantity');
    console.log("timeQuantity retrieved from GET: " + timeQuantity);
    console.log("typeof(timeQuantity) retrieved from GET: " + typeof(timeQuantity));

    if (timeQuantity == null && timeField == "") {
        alert("Time input field is empty!");
        return null;

    }

    return  timeField != null ? timeField : timeQuantity;


}