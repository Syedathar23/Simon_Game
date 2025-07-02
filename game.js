var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern =[];

var userClickedPattern=[];

var level = 0;

var started = false;

$(document).on("keydown",function(){
    nextSequence();
    $("h1").text("Level 0");
    level = 0;
    started = true;
})

$(".btn").on("click",function () {
    var userChosenColor=$(this).attr("id");
    
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    var lastIndex = buttonColours[userChosenColor];

    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        
        if (userClickedPattern.length === gamePattern.length){
         setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    }else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over Press Any key to Restart");

         setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200)

        startOver();

    }
}

function nextSequence (){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
};

function animatePress(currentcolor){
    $("#"+currentcolor).addClass("pressed");

    setTimeout(function(){
      $("#"+currentcolor).removeClass("pressed");  
    },100);
}

function playSound( name){

    const audio = new Audio(name+".mp3");
    
    audio.play();
    
}

function startOver(){
    level = 0;
    gamePattern=[];
    started = false;
}


