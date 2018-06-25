//define vars
var hero = "";
var enemy = "";
var gameState = "new";

//create audio objects
var audioGameTheme = new Sound("assets/audio/theme-2.mp3", .02);
var audioYodaTheme = new Sound("assets/audio/yodalaughing.mp3", 1);
var audioVadarTheme = new Sound("assets/audio/darth-quote-1.mp3", 1);

//create character objects
var yoda = new Character("yoda", 100, 20, 15, audioYodaTheme);
var vadar = new Character("vadar", 100, 20, 15, audioVadarTheme);


//event listeners for character clicks
$(".character").click(function() {
    window[this.id].speak();
    console.log("Clicked: " + this.id);
});



//audio object constructor
function Sound(src, vol) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = vol;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}


//character object constructor
function Character(name, health, attack, counter, audioTheme) {
    this.name = name;
    this.healthPoints = health;
    this.attackPoints = attack;
    this.counterPoints = counter;
    this.audioTheme = audioTheme;
    this.speak = function() {
        this.audioTheme.play();
    }
}