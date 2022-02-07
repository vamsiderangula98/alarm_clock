var today, currentTime, alarms,currentDate,audio;

// array for storing alarms
alarms = [];
 var audio1 = new Audio('https://samplelib.com/lib/preview/mp3/sample-15s.mp3');
 var audio2= new Audio('https://samplelib.com/lib/preview/mp3/sample-6s.mp3');
var audio3= new Audio('https://samplelib.com/lib/preview/mp3/sample-9s.mp3');
var audio4= new Audio('https://samplelib.com/lib/preview/mp3/sample-12s.mp3');
var audio5= new Audio('https://samplelib.com/lib/preview/mp3/sample-3s.mp3');


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
    
    const html =`<li> ${newAlarm} 
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

