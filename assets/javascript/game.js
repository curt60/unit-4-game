//define single game object at the global scope that includes all custom vars and functions

//define vars
var hero = ""; //currently selected hero
var enemy = ""; //currently selected enemy
var gameState = "new";
var playTheme = true;
var audioAttackSounds = [];
var audioAttackIndex = 0;

//create audio objects
var audioGameTheme = new Sound("assets/audio/theme-1.mp3", .02);
var audioBattleStart = new Sound("assets/audio/battle-start.wav", 1);
var audioBattleEnd = new Sound("assets/audio/battle-end.mp3", 1);
var audioGameOver = new Sound("assets/audio/game-over.mp3", 1);
for (let i = 0; i < 12; i++) {
    audioAttackSounds[i] = new Sound("assets/audio/attack-" + i + ".wav", 1);
}

//create character objects
var yoda = new Character("yoda", 100, 20, 15, "assets/audio/yoda.mp3");
var vadar = new Character("vadar", 100, 20, 15, "assets/audio/vadar.mp3");
var maul = new Character("maul", 100, 20, 15, "assets/audio/maul.wav");
var luke = new Character("luke", 100, 20, 15, "assets/audio/luke.mp3");
var leia = new Character("leia", 100, 20, 15, "assets/audio/leia.mp3");
var rey = new Character("rey", 100, 20, 15, "assets/audio/rey.mp3");

//event listeners for keyboard
document.onkeyup = function() {
    //start theme song after pressing any key (can't start before user interaction due to chrome policy)
    if (playTheme) {
        audioGameTheme.play();
        playTheme = false;
    }
}

//event listeners for character clicks
$(".character").click(function() {
    //move character to hero or enemy section
    if (!hero) {
        //remove hero selection instructions
        $(".heroChar > .instructions")[0].style.display = "none";
        //move selected character to hero section
        window[this.id].move(".heroChar");
        //display enemy selection instructions
        $(".enemyChar > .instructions")[0].style.display = "initial";
        //change border of all characters
        let charElements = $(".character")
        for (i = 0; i < charElements.length; i++) {
            if (charElements[i].id === hero) {
                charElements[i].style.border = "1px solid #007bff";
            }
            else {
                charElements[i].style.border = "1px solid red"; 
            }
        }
    }
    else if (!enemy && this.id != hero) {
        //remove enemy selection instructions
        $(".enemyChar > .instructions")[0].style.display = "none";
        //move selected character to enemy section
        window[this.id].move(".enemyChar");
        //play battle start sound
        window.setTimeout(function() {audioBattleStart.play();}, 3000);
    }
    window[this.id].speak();
    console.log("Clicked: " + this.id);
});

//event listener for attach button
$("button").click( function() {
    //stop current sound if stil playing
    audioAttackSounds[audioAttackIndex].stop();
    audioAttackSounds[audioAttackIndex].sound.currentTime = 0;
    //play new random attack sound
    audioAttackIndex = Math.floor(Math.random() * 12);
    audioAttackSounds[audioAttackIndex].play();
    console.log("attack-" + audioAttackIndex + ".wav")
    attack(hero, enemy);
    if (window[hero].isDead()) {
        gameOver("enemy");
    }
    else if (window[enemy].isDead()) {
        removeEnemy();
    }
});


//display starting instructions
    //"press any key to begin"

//keyboard input
    //play theme song
    //remove initial instruction dialog

//on character click:
    //if !hero
        //select hero
            //display stats
    //else if !enemy
        //select enemy
            //display stats

//on attack click
    //calculate damage for both chars
    //update stats
    //if hero dead
        //game over sequence
    //if enemy dead
        //remove character
        //play: turn off saber
        //reset enemy var
        //add instructions for selecting next enemy

    


//sound object constructor (I didn't realize that a built-in constructor exists)
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
    this.health = health;
    this.baseAttack = attack;
    this.currentAttack = attack;
    this.counterAttack = counter;
    //set character audio w/ volume 100%
    this.audioTheme = new Sound(audioUrl, 1);
    this.speak = function() {
        this.audioTheme.play();
    };
    //check if character died
    this.isDead = function() {
        if (this.health < 0) return true;
        else return false;
    };
    //character move sequence (with slow transition)
    this.move = function(destination) {
        //store character HTML element as variable
        var charElement = $("#" + name);
        //set hero or enemy var
        if (destination === ".heroChar") hero = name;
        else if (destination === ".enemyChar") enemy = name;
        //add slow transition to move
        charElement[0].style.opacity = 0;
        setTimeout(function() {$(destination).append(charElement);}, 800);
        setTimeout(function() {charElement[0].style.opacity = 1;}, 1000);
    }
}

//remove character from enemy section (used after defeated)
function removeEnemy() {
    var parentElement = $(".enemyChar");
    var charElement = $("#" + enemy);
    enemy = "";
    //add slow transition
    charElement[0].style.opacity = 0;
    setTimeout(function() {parentElement[0].removeChild(charElement[0])}, 800);
    //display enemy selection instructions
    setTimeout(function() {$(".enemyChar > .instructions")[0].style.display = "initial";}, 900);
    setTimeout(function() {audioBattleEnd.play();}, 2000);
}

//calculate attack stats
function attack(hero, enemy) {
    window[enemy].health -= window[hero].currentAttack;
    window[hero].currentAttack += window[hero].baseAttack;
    window[hero].health -= window[enemy].counterAttack;
    console.log("hero attack " + window[hero].currentAttack);
    console.log("hero health " + window[hero].health);
    console.log("enemy health " + window[enemy].health);
}

//game over sequence
function gameOver(winner) {
    if (winner === "hero") {
        //do happy stuff
        audioGameTheme.stop();
        setTimeout(function() {audioGameOver.play();}, 3000);
    }
    else {
        //do sad stuff
        $("#" + hero)[0].style.backgroundColor = "red";
        $("#" + hero + "> img")[0].style.opacity = .4;
        audioGameTheme.stop();
        setTimeout(function() {audioGameOver.play();}, 3000);
    }
}