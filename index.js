var pomoLength = [25, 0];
var breakLength = [5, 0];
var timer;
var pressedStart = false;
var breakTime = false;

var playButton = document.querySelector("#play_button");
var resetButton = document.querySelector("#reset");
var timerText = document.querySelector("#clockTime");
var pomodoroButtons = document.querySelectorAll('button');
var pomodoroDiv = document.querySelector("#pomodoro_base");

resetButton.addEventListener('click', (e) =>{
    location.reload();
});

//If start button is clicked...
playButton.addEventListener('click', (e) => {
    console.log("Starting Timer at 25:00");
    //...check to see if it has been pressed already
    // START TIMER
    if(!pressedStart){
        //... if not, then start the timer
        if(!breakTime){
            timer = setInterval(secondPass, 1000, pomoLength);
            console.log("Starting PomoTimer");
        }
        else if(breakTime){
            timer = setInterval(secondPass, 1000, breakLength);
            console.log("Starting BreakTimer");
        }
        // and record that it was pressed
        pressedStart = true;
        playButton.innerHTML = "Pause";
    }
    //PAUSE TIMER
    // if it has been pressed
    else if(pressedStart){
        // stop the timer
        clearInterval(timer);
        // and record that it was pressed again
        pressedStart = false;
        playButton.innerHTML = "Start";
    }
});

function secondPass(time){
    //Counts down one second each time timer ends...
    if(time[1] > 0){
        time[1] -= 1;
    }
    //...unless timer is zero, then it wraps to 59...
    else if(time[1] == 0){
        time[1] = 59;
        //...and it will then do the same check for minutes...
        if(time[0] > 0){
            time[0] -= 1;
        }
        //...if minutes is zero then timer ends
        else if(time[0] == 0){
            timerEnd();
            }
        }
    timerText.innerHTML = time.join(":");
}

function timerEnd(){
    if(!breakTime){
        console.log("Switching to Break time.");
        changeBackground();
        clearInterval(timer);
        timer = setInterval(secondPass, 1000, breakLength);
        breakTime = true;
    }
    else if(breakTime){
        console.log("Switching to Pomodoro time.");
        changeBackground();
        clearInterval(timer);
        timer = setInterval(secondPass, 1000, pomoLength);
        breakTime = false;
    }

}

function changeBackground(){
    if(!breakTime){
        pomodoroDiv.style.background = "#66b3ff";

        for(i=0; i < pomodoroButtons.length; i++){
            pomodoroButtons[i].style.background = "#66b3ff";
        }
    }
    if(breakTime){
        pomodoroDiv.style.background = "#ff6666";
        for(i=0; i < pomodoroButtons.length; i++){
            pomodoroButtons[i].style.background = "#ff6666";
        }
    }
}

function resetTimer(){
    location.reload(true);
}

