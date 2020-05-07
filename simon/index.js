var buttonColours = ["red","blue","yellow","green"];
var sequence = [];
var level = 0;
var counter = 0;


 $(document).on('keydown', function(){
    //  reset
    sequence = [];
    level = 0;
    
    nextSequence();
 });

$(".btn").click(function() {
    var animated = $("."+this.id);
    animated.addClass("pressed");

    if (sequence[counter] === this.id){
        (new Audio("sounds/"+this.id+".mp3")).play();
        counter++;
        if (counter === level){
            nextSequence();
        }
    }
    else{
        (new Audio("sounds/wrong.mp3")).play();
        $("h1").text("Game Over, Press Any Key to Restart");

        var back = $("body")
        back.addClass("game-over");
        sequence = [];
        level = 0;
        setTimeout(function (){
            back.removeClass("game-over");
        }, 200);
    }


    setTimeout(function (){
        animated.removeClass("pressed");
    }, 100);
});


function nextSequence(){
    setTimeout(function (){
       
        var randomNum = Math.floor(Math.random()*4);
        var next = buttonColours[randomNum];
        sequence.push(next);
        counter = 0;
        level++;
        $("h1").text("level " + level);


        var animated = $("."+next);
        animated.addClass("pressed");
        (new Audio("sounds/"+next+".mp3")).play();
        setTimeout(function (){
            animated.removeClass("pressed");
        }, 100);
    },500);
}