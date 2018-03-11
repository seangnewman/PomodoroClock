class clockObject{
    constructor(sessionTimeRemaining, breakTimeRemaining){
         
        this.sessionTimeRemaining = sessionTimeRemaining;
        this.breakTimeRemaining = breakTimeRemaining;

        this.formattedTime = function(timeVariable){
            return timeVariable%60 >= 10?Math.floor(timeVariable/60) + " : " + timeVariable%60 : Math.floor(timeVariable/60) + " : " + "0" + timeVariable%60;
        };
    }
     
}

var pomodoroAlarm;
var sessionRemainingTime;
var breakRemainingTime;


function attachAudio(){
  var theAlarm = $("<audio>");
  theAlarm.attr("src","./resources/audio/clockchime.mp3");
  theAlarm.attr("type","audio/mpeg");
  theAlarm.attr("id","pomodoroAlarm");
  $('main').append(theAlarm);
}



function timeStart(){
    $("#startButton").hide();
    $("#subFiveSessionButton").hide();
    $("#addFiveSessionButton").hide();
    $("#subFiveBreakButton").hide();
    $("#addFiveBreakButton").hide();
    $("#sessionTitle").hide();
    $("#breakTitle").hide();
    $("#breakSessionTime").hide();
}

function timeRestore(){
    $("#startButton").show();
    $("#minus5Clock").show();
    $("#addFiveSessionButton").show();
    $("#subFiveBreakButton").show();
    $("#addFiveBreakButton").show();
    $("#sessionTitle").show();
    $("#breakTitle").show();
    $("#breakSessionTime").show();
}

function timeReset(breakInterval){
    clearInterval(breakInterval);
    $("#reset").show();
    $("#breakSessionTime").hide();
    $("#sessionType").hide();
    pomodoroAlarm.play();
}

function timeEnd(sessionRemainingTimeer){
   clearInterval(sessionRemainingTimeer);
   
   pomodoroAlarm.play();
   $('#sessionTime').hide();
   
   var startBreak = setInterval(function(){
        $('#sessionType').html("Break Time : ");
        $('#breakSessionTime').show();
        $('#breakSessionTime').html(breakRemainingTime);
        
        var timeHolder = breakRemainingTime%60 >= 10?Math.floor(breakRemainingTime/60) + " : " + breakRemainingTime%60 : Math.floor(breakRemainingTime/60) + " : " + "0" + breakRemainingTime%60;
        $("#breakSessionTime").html(timeHolder);
       
        breakRemainingTime === 0? timeReset(startBreak): breakRemainingTime = breakRemainingTime-1;
   }, 1000);


}


$(document).ready(function(){

    attachAudio();
    pomodoroAlarm=$("#pomodoroAlarm")[0];

     sessionRemainingTime =  parseInt($("#sessionTime").html());
     breakRemainingTime =  parseInt($("#breakSessionTime").html());
    
    //pomodoroAlarm.play();
    $("#reset").hide();


    $("#startButton").on("click", function(e){
        e.preventDefault();
        timeStart();
        sessionRemainingTime *= 60;
        breakRemainingTime*=60;
        $("#sessionType").html("Session Time : ");
        var sessionRemainingTimeer = setInterval(function(){
            var timeHolder = sessionRemainingTime%60 >= 10?Math.floor(sessionRemainingTime/60) + " : " + sessionRemainingTime%60 : Math.floor(sessionRemainingTime/60) + " : " + "0" + sessionRemainingTime%60;
            $("#sessionTime").html(timeHolder);
            sessionRemainingTime === 0? timeEnd(sessionRemainingTimeer): sessionRemainingTime = sessionRemainingTime-1;
            
        }, 1000);




    });
    $("#reset").on("click", function(e){
        e.preventDefault();
        sessionRemainingTime = 25;
        breakRemainingTime = 25;
        $("#sessionTime").html(sessionRemainingTime);
        $("#breakSessionTime").html(breakRemainingTime);
        timeRestore();
        $('#sessionType').hide();
        $("#sessionTime").show();
        $(this).hide();
    });

    $("#subFiveSessionButton").on("click",function(e){
        e.preventDefault();
        sessionRemainingTime = sessionRemainingTime <= 0? 0: sessionRemainingTime-5; 
        $("#sessionTime").html(sessionRemainingTime);
    });
    $("#addFiveSessionButton").on("click",function(e){
        e.preventDefault();
        sessionRemainingTime += 5; 
        $("#sessionTime").html(sessionRemainingTime);
    });


    $("#subFiveBreakButton").on("click",function(e){
        e.preventDefault();
        breakRemainingTime = breakRemainingTime <= 0? 0: breakRemainingTime-5; 
        $("#breakSessionTime").html(breakRemainingTime);
    });
    $("#addFiveBreakButton").on("click",function(e){
        e.preventDefault();
        breakRemainingTime += 5; 
        $("#breakSessionTime").html(breakRemainingTime);
    });



});