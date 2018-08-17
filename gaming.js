var game = new Game()

//////////////////////////////////////////////////////////walkUp, walkDown, walkRight, walkLeft

$('.message').toggle();

Game.prototype.walkUp = function () {
  if (this.player.y === 0) {
    console.log("you cannot go outside of the board")
    //if he is on the y-border, cant go up
  } else if (
    this.maze[this.player.y - 1][this.player.x] === "W") {
    console.log("you cannot walk through the walls")
    //if he hits a wall while going up (y-1)
  } else if (
    this.maze[this.player.y - 1][this.player.x] === "$") {
    console.log("congrats!!!")
    // if he finds $$$ while going up (y-1)
    var victory = confirm("Congratulations, you found your way out!")
  } else if (this.maze[this.player.y - 1][this.player.x] === "X") {
    // question time
    console.log("It's time to answer a question")
    questionTime((this.player.y - 1), this.player.x);
  } else {
    this.player.y -= 1; //player now moved one up
    this.maze[this.player.y][this.player.x] = "P"; //new location on maze
    this.maze[this.player.y + 1][this.player.x] = "o";
  } //new location will turn to P, old one to open space
}

Game.prototype.walkDown = function () {
  if (this.player.y == this.maze.length - 1) {
    // this.maze.length-1 bc length starts at 1, not like index at 0
    console.log("you cannot go outside of the maze")
  } else if (
    this.maze[this.player.y + 1][this.player.x] === "W") {
    console.log("you cannot go through walls")
    //if he hits a wall while going down (y+1)
  } else if (
    this.maze[this.player.y + 1][this.player.x] === "$") {
    // if he finds $$$ while going down (y+1)
    $('#end').toggle()
  } else if (this.maze[this.player.y + 1][this.player.x] === "X") {
    // question time
    console.log("It's time to answer a question")
    questionTime((this.player.y + 1), this.player.x);
  } else {
    this.player.y += 1; //this.player is now one step down(y+1)
    this.maze[this.player.y][this.player.x] = "P"; //new location on board
    this.maze[this.player.y - 1][this.player.x] = "o"
    //new location will turn to P, old one to open space
  }
}

Game.prototype.walkRight = function () {
  if (this.player.x == this.maze.length - 1) {
    // this.maze.length-1 bc length starts at 1, not like index at 0
    console.log("right border")
  } else if (
    this.maze[this.player.y][this.player.x + 1] === "W") {
    console.log("hit a wall")
    //if he hits a wall while going right (x+1)
  } else if (
    this.maze[this.player.y][this.player.x + 1] === "$") {
    // if he finds $$$ while going right (x+1)
    var victory = confirm("Congratulations, you found your way out!");
  } else if (this.maze[this.player.y][this.player.x + 1] === "X") {
    // question time
    console.log("It's time to answer a question")
    questionTime(this.player.y, (this.player.x + 1));
  } else {
    this.player.x += 1; //this.player is now one step right(x+1)
    this.maze[this.player.y][this.player.x] = "P"; //new location on board
    this.maze[this.player.y][this.player.x - 1] = "o"
    //new location will turn to P, old one to open space
  }
}

Game.prototype.walkLeft = function () {
  if (this.player.x == 0) {
    // if player is on left border
    console.log("left border")
  } else if (this.maze[this.player.y][this.player.x - 1] === "W") {
    //if he hits a wall while going left (x-1)
    console.log("hit a wall")
  } else if (this.maze[this.player.y][this.player.x - 1] === "$") {
    // if he finds $$$ while going left (x-1)
    var victory = confirm("Congratulations, you found your way out!")
  } else if (this.maze[this.player.y][this.player.x - 1] === "X") {
    // question time
    console.log("It's time to answer a question")
    questionTime(this.player.y, (this.player.x - 1));
  } else {
    this.player.x -= 1; //this.player is now one step left (x-1)
    this.maze[this.player.y][this.player.x] = "P"; //new location on board
    this.maze[this.player.y][this.player.x + 1] = "o"
    //new location will turn to P, old one to open space
  }
}

////////////////////////////////////////////////////////////////////////////////////// Keys to move

$(window).on('keydown', function (event) {
  console.log(" you pressed a key ")
  console.log(event.which)
  switch (event.which) {
    case 38:
      event.preventDefault()
      game.walkUp();
      console.log("position x after up -->", game.player.x)
      console.log("position y after up -->", game.player.y)

      break;

    case 40:
      event.preventDefault()
      game.walkDown();
      console.log("position x after down -->", game.player.x)
      console.log("position y after down -->", game.player.y)
      break;

    case 39:
      event.preventDefault()
      game.walkRight();
      console.log("position x after right -->", game.player.x)
      console.log("position y after right -->", game.player.y)
      break;

    case 37:
      event.preventDefault()
      game.walkLeft();
      console.log("position x after left -->", game.player.x)
      console.log("position y after left -->", game.player.y)
      break;

    default:
      console.log('unsupported key was pressed');
  }
  updateMaze()
});

////////////////////////////////////////////////////////////////////////////////////building mazetiles

for (var i = 0; i < 21; i++) {
  for (var j = 0; j < 21; j++) {
    var newTile = $("<div id='" + i + "-" + j + "' class='tile'></div>");
    $("#playground").append(newTile);
  }
}

function updateMaze() {
  $('.tile').removeClass('player');

  for (var i = 0; i < 21; i++) {
    for (var j = 0; j < 21; j++) {

      if (game.maze[i][j] == "P") {
        $('#' + i + '-' + j).addClass('player');
      }
      if (game.maze[i][j] == "W") {
        $('#' + i + '-' + j).addClass('wall');
      }
      if (game.maze[i][j] == "o") {
        $('#' + i + '-' + j).addClass('tile');
      }
      if (game.maze[i][j] == "$") {
        $('#' + i + '-' + j).addClass('victory');
      }
      if (game.maze[i][j] == "X") {
        $('#' + i + '-' + j).addClass('questiontime')
      }
    }
  }
}
updateMaze();

////////////////////////////////////////////////////////////////////////Restart Button
$(".button").click(function () {
  console.log("clicked restart")
  game = new Game();
  updateMaze();
})

/////////////////////////////////////////////////////////////////////function QUESTIONTIME
function questionTime(y, x) {
  console.log("question time!!!!");
  var question = questions[game.question];
  var hints = question.hints.slice(0, question.asked).join("\n");
  var answer = prompt(question.q + "\n" + hints);
  if (answer !== null && question.a.includes(answer.toLowerCase())) {
    game.question += 1;
    game.maze[game.player.y][game.player.x] = "o"
    game.maze[y][x] = "P";
    game.player.y = y;
    game.player.x = x;
    $('#correct-answer').fadeIn().delay(1000).fadeOut('slow');
  } else {
    question.asked += 1;
    $('#incorrect-answer').fadeIn().delay(1000).fadeOut('slow');
  }
}
//////////////////////////////////////////////////////////////////////////////////QUESTIONS
var questions = [{
    q: "What belongs to you but is used more by others?",
    a: ["name", "love"],
    hints: ["You cannot touch it.", "True friends change it.", "The 1st letter is n."],
    asked: 0
  },
  {
    q: "What kind of room has no doors or windows?",
    a: ["mushroom", "chatroom", "broom", "love"],
    hints: ["think outside the box", "go with the Alice in Wonderland theme here", "shiitake"],
    asked: 0
  },
  {
    q: "I am a ship that can be made to ride the greatest waves. I am not built by tool, but built by hearts and minds. What am I?",
    a: ["friendship", "love"],
    hints: ["I get by with a little help", "What is it worth fighting for?", "1st letter is f"],
    asked: 0
  },
  {
    q: "What is easy to get into, but hard to get out of?",
    a: ["trouble", "graveyard", "love"],
    hints: ["curiosity often leads to ...", "you rebel you", "1st letter is t"],
    asked: 0
  },
  {
    q: "If I have it, I don't share it. If I share it, I don't have it. What is it?",
    a: ["secret", "love"],
    hints: ["But everybody wants to know", "gossip", "1st letter is s"],
    asked: 0
  },
  {
    q: "What is the beginning of eternity, the end of time and space, the beginning of every end and the end of every race?",
    a: ["e", "love"],
    hints: ["It is quite obvious.", "Think in letters.", "17 times in this question"],
    asked: 0
  },
];