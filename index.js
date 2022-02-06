var today,currenttime,currentdate;

var update=setInterval(function(){
today=new Date();
currenttime=format(today.getHours())+':'+format(today.getMinutes())+':'+format(today.getSeconds());
currentdate=format(today.getFullYear())+'/'+format(today.getMonth()+1)+'/'+format(today.getDate());
document.querySelector('#timebox').innerHTML=currenttime;
document.querySelector('#datebox').innerHTML=currentdate;

    },1000);
    

function format(mytime) {
    if(mytime < 10) {
        mytime %= 10;
        return '0'+mytime;
    }
    else return mytime%(mytime+1);
}