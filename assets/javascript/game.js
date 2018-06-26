//define vars
var hero = "";
var enemy = "";
var gameState = "new";

//create audio objects
var audioGameTheme = new Sound("assets/audio/theme.mp3", .02);
var audioAttack = new Sound("assets/audio/blaster.mp3", 1);

//create character objects
var yoda = new Character("yoda", 100, 20, 15, "assets/audio/yodalaughing.mp3");
var vadar = new Character("vadar", 100, 20, 15, "assets/audio/darth-quote-1.mp3");

//event listeners for keyboard
document.onkeyup = function(event) {
    audioGameTheme.play();
}

//event listeners for character clicks
$(".character").click(function() {
    //if character in available section && hero not set
        //move the character to hero spot
        //speak
    //if character in available section && hero set
    
    window[this.id].speak();
    console.log("Clicked: " + this.id);
});

//event listener for attach button
$("button").click( function() {
    audioAttack.play();
});


//display starting instructions

//keyboard input
    //play theme song
    //remove instructions
    //initialize game(?)

//select hero
    //set hero var
    //character speak
    //character move

//select enemy
    //set enemy var
    //character speak
    //character move
    //delay ...light saber on

//attack
    //calculate damage for both chars and update stats
    //if one character dead
        //remove character
        //wait for 'select enemy'

    

//end of battle
    //turn off saber


//audio object constructor
function Sound(src, vol) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = (vol || 1);
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}


//character object constructor
function Character(name, health, attack, counter, audioUrl) {
    this.name = name;
    this.healthPoints = health;
    this.attackPoints = attack;
    this.counterPoints = counter;
    this.audioTheme = new Sound(audioUrl, 1);
    this.speak = function() {
        this.audioTheme.play();
    this.isDead = function() {
        if (this.healthPoints < 0) true;
        else false;
    }
    }
}