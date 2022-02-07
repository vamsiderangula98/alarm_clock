var today, currentTime, alarms,currentDate,audio;

// array for storing alarms
alarms = [];

var setAlarm = document.querySelector('.setAlarm');
  
var audio=new Audio('https://samplelib.com/lib/preview/mp3/sample-15s.mp3');

// function for ringing the alarm
function ringAlarm() {
    audio.autoplay = true;
    audio.play();
    // alert('Alarm is Ringing!!!!!!');
    console.log('Alarm is Ringing !!!!!!');
}


// event to pause the alarm audio
var stopbtn = document.getElementById('stopalarm');
stopbtn.addEventListener('click', () => {
    audio.pause();
    console.log('playing audio stopped');
});


// update the time each second
var update = setInterval(function() {
    today = new Date();
    currentTime = format(today.getHours()) + ':' + format(today.getMinutes()) + ':' + format(today.getSeconds());
    currentDate = format(today.getHours()) + '/' + format(today.getMonth()+1) + '/' + format(today.getDate());
    document.querySelector('#timebox').innerHTML = currentTime;
    document.querySelector('#datebox').innerHTML = currentDate;
    if(alarms.includes(currentTime)) {
        //alert to show in the browser
        // alert('Alarm is Ringing!!!!!!');
        ringAlarm();
    }

}, 1000);


function format(mytime) {
    if(mytime < 10) {
        mytime %= 10;
        return '0'+mytime;
    }
    else return mytime%(mytime+1);
}

// event to add Alarm after submission of form
setAlarm.addEventListener('submit', (event) => {
    // if the form data is invalid, it will prevent form submitting
    event.preventDefault();

    // retrieving data from the form
    let newHour = format(setAlarm.hours.value);
    let newMin = format(setAlarm.minutes.value);
    let newSec = format(setAlarm.seconds.value);

    const newAlarm = `${newHour}:${newMin}:${newSec}`;
    // const newAlarm = newHour + ':' + newMin + ':' + newSec;
    if(!alarms.includes(newAlarm)) {
        alarms.push(newAlarm);
        console.log(alarms);
        showAlarm(newAlarm);
        setAlarm.reset();
    } else {
        alert('The current new Alarm has already been setup');
    }
            
});

// display newAlarm
const alarmsList = document.getElementById('alarmlist');
function showAlarm(newAlarm) {
    
    const html =`<li >${newAlarm} &nbsp;
                    <button class="btn btn-danger" id="dlt-button" value='${newAlarm}' onclick= 'remove(this.value)'>Delete Alarm</button>
                    </li>`
                
    
    alarmsList.innerHTML += html;
}


// delete the selected alarm from the page 
alarmsList.addEventListener('click', (event) => {
    event.target.parentElement.remove();
});

// also need to delete the alarm from the array
function remove(value) {
    alarms = alarms.filter((time) => {
        return value != time;
    });
    console.log('successfully removed from the alarms array');
    console.log(alarms);
}
// Convert time to a format of hours, minutes, seconds, and milliseconds

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
  
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
  
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
  
    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);
  
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");
  
    return `${formattedMM}:${formattedSS}:${formattedMS}`;
  }
  
  // Declare variables to use in our functions below
  
  let startTime;
  let elapsedTime = 0;
  let timerInterval;
  
  // Create function to modify innerHTML
  
  function print(txt) {
    document.getElementById("display").innerHTML = txt;
  }
  
  // Create "start", "pause" and "reset" functions
  
  function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      print(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
  }
  
  function pause() {
    clearInterval(timerInterval);
    showButton("PLAY");
  }
  
  function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    showButton("PLAY");
  }
  
  // Create function to display buttons
  
  function showButton(buttonKey) {
    const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
    const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
    buttonToShow.style.display = "block";
    buttonToHide.style.display = "none";
  }
  // Create event listeners
  
  let playButton = document.getElementById("playButton");
  let pauseButton = document.getElementById("pauseButton");
  let resetButton = document.getElementById("resetButton");
  
  playButton.addEventListener("click", start);
  pauseButton.addEventListener("click", pause);
  resetButton.addEventListener("click", reset);


// Select Countdown container
const countContainer = document.getElementById("countdown-number");

// Select action buttons
const starttimerButton = document.getElementById("starttimer");
const stoptimerButton = document.getElementById("stoptimer");
const resettimerButton = document.getElementById("resettimer");

// Select timeout Audio element
const timeoutAudio = document.getElementById("timeout_audio");

// variable to store count
var remainingTime;
var settimer=document.querySelector('.settimerfields');
settimer.addEventListener('submit',(event)=>{
    event.preventDefault();
    remainingTime=settimer.rtime.value;
    countContainer.innerHTML = remainingTime;
    
});




// variable to store time interval
var timer;

// Variable to track whether timer is running or not
var isStopped = true;

// Function to start Timer
const startTimer = () => {
  if (isStopped) {
    isStopped = false;
    countContainer.innerHTML = remainingTime;
    timer = setInterval(renderTime, 1000);
  }
};

// Function to stop Timer
const stopTimer = () => {
  isStopped = true;
  if (timer) {
    clearInterval(timer);
  }
};

// Function to reset Timer
const resetTimer = () => {
  isStopped = true;
  clearInterval(timer);

remainingTime=0;

  countContainer.innerHTML = remainingTime;
};

// Initialize timeout sound
timeoutAudio.src = "http://soundbible.com/grab.php?id=1252&type=mp3";
timeoutAudio.load();

// Attach onclick event to buttons
starttimerButton.onclick = startTimer;
resettimerButton.onclick = resetTimer;
stoptimerButton.onclick = stopTimer;

// function to display time
const renderTime = () => {
  // decement time
  if(remainingTime>0){
  remainingTime -= 1;
  }
  // render count on the screen
  countContainer.innerHTML = remainingTime;
  // timeout on zero
  if (remainingTime === 0) {
    isStopped = true;
    clearInterval(timer);
    // Play audio on timeout
    timeoutAudio.play();
    remainingTime=settimer.rtime.value;

  }
};