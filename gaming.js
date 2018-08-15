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
    var victory = confirm("Congratulations, you found your way out!")
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
  } else if ( this.maze[this.player.y][this.player.x - 1] === "W") {
    //if he hits a wall while going left (x-1)
    console.log("hit a wall")
  } else if ( this.maze[this.player.y][this.player.x - 1] === "$") {
    // if he finds $$$ while going left (x-1)
    var victory = confirm("Congratulations, you found your way out!")

  } else {
    this.player.x -= 1; //this.player is now one step left (x-1)
    this.maze[this.player.y][this.player.x] = "P"; //new location on board
    this.maze[this.player.y][this.player.x + 1] = "o"
    //new location will turn to P, old one to open space
  }
}



////////////////////////////////////////////////////////////////////////////////// Keys to move



$(window).on('keydown', function (event) {
  console.log(" you pressed a key ")
  console.log(event.which)
  switch (event.which) {
    case 38:
      game.walkUp();
      console.log("position x after up -->", game.player.x)
      console.log("position y after up -->", game.player.y)

      break;

    case 40:
      game.walkDown();
      console.log("position x after down -->", game.player.x)
      console.log("position y after down -->", game.player.y)
      break;

    case 39:
      game.walkRight();
      console.log("position x after right -->", game.player.x)
      console.log("position y after right -->", game.player.y)
      break;

    case 37:
      game.walkLeft();
      console.log("position x after left -->", game.player.x)
      console.log("position y after left -->", game.player.y)
      break;

    default:
      console.log('unsupported key was pressed');
  }
  updateMaze()
  askQuestion()
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


//////////////////////////////////////////////////////////////////////////////////////////QUESTIONTIME
var questions = [
  {
    q:"1+1=?",
    a: "2",
    answered: false
  },
  {
    q:"2+2=?",
    a: "4",
    answered: false
  },
  {
    q:"3+3=?",
    a: "6",
    answered: false
  }
];

function askQuestion() {

  if ( (game.player.y === 5 && game.player.x === 4) && !questions[0].answered ) {
    console.log("ANSWER THIS QUESTION")
    var answer = prompt (questions[0].q)
    if (answer === questions[0].a) {
      questions[0].answered = true
      $('#correct-answer').fadeIn().delay(1000).fadeOut('slow');
    } else {
      game.player.y = 5
      game.player.x = 5
      game.maze[game.player.y][game.player.x] = "P"
      game.maze[5][4] = "X"
      updateMaze()
    }
  }
}






////////////////////////////////////////////////////////////////////////Restart Button

$(".button").click(function () {
  console.log( "clicked restart" )
  game = new Game();
  updateMaze();
})


