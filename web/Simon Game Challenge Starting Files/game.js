var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var bestLevel = 0;
var started = false;

function resetGame() {
  recordLevel();
  gamePattern = [];
  userPattern = [];
  level = 0;
  started = false;
}

function recordLevel() {
  if (level > bestLevel) {
    bestLevel = level-1;
    $("#level-record").text("Best Record: level " + bestLevel);
  }else{
    $("#level-record").text("Best Record: level " + bestLevel);
  }
}

function buttonAnimation(currentKey) {
  $("#" + currentKey).fadeToggle(100);
  $("#" + currentKey).fadeToggle(100);
}

function buttonAudio(currentKey) {
  var audio = new Audio("sounds/" + currentKey + ".mp3");
  audio.play();
}

function nextSequence() {
  ++level;
  $("h1").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  buttonAnimation(randomChosenColor);
  buttonAudio(randomChosenColor);
}

function checkAnswer() {
  var i = 0;
  while (i < userPattern.length) {
    if (userPattern[i] === gamePattern[i]) {
      i++;
    } else {
      resetGame();
      gameOver();
      return;
    }
  }
  if (userPattern.length === gamePattern.length) {
    userPattern = [];
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

function gameOver() {
  $("h1").text("Game Over, Press Any Key to Restart");
  var gameOverAudio = new Audio("sounds/wrong.wav");
  gameOverAudio.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}


$(document).on("keydown", function() {
  if (started === false) {
    nextSequence();
    started = true;
  }
});

$(".btnn").on("click", function() {
  buttonAnimation(this.id);
  buttonAudio(this.id);
  if (started === true) {
    userPattern.push(this.id);
    checkAnswer();
  } else {
    resetGame();
    gameOver();
  }
});

$(".btnStart").on("click", function() {
  resetGame();
  if (started === false) {
    nextSequence();
    started = true;
  }
});
