var gameOfLife = {
    width: 12,
    height: 12,
    stepInterval: null,
  
    createAndShowBoard: function () {
      // create <table> element
      var goltable = document.createElement("tbody");
  
      // build Table HTML
      var tablehtml = '';
      for (var h=0; h<this.height; h++) {
        tablehtml += "<tr id='row+" + h + "'>";
        for (var w=0; w<this.width; w++) {
          tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
        }
        tablehtml += "</tr>";
      }
      goltable.innerHTML = tablehtml;
  
      // add table to the #board element
      var board = document.getElementById('board');
      board.appendChild(goltable);
  
      // once html elements are added to the page, attach events to them
      this.setupBoardEvents();
    },
  
    forEachCell: function (iteratorFunc) {
      var allCells = document.getElementsByTagName("td");
      var cellArray = Array.from(allCells);
      cellArray.forEach(function(cell){
        iteratorFunc(cell);
      });
    },
  
    setupBoardEvents: function() {
      // each board cell has an CSS id in the format of: "x-y"
      // where x is the x-coordinate and y the y-coordinate
      // use this fact to loop through all the ids and assign
      // them "on-click" events that allow a user to click on
      // cells to setup the initial state of the game
      // before clicking "Step" or "Auto-Play"
  
      // clicking on a cell should toggle the cell between "alive" & "dead"
      // for ex: an "alive" cell be colored "blue", a dead cell could stay white
  
      // EXAMPLE FOR ONE CELL
      // Here is how we would catch a click event on just the 0-0 cell
      // You need to add the click event on EVERY cell on the board
  
      var onCellClick = function (e) {
        // QUESTION TO ASK YOURSELF: What is "this" equal to here?
  
        // how to set the style of the cell when it's clicked
        if (this.getAttribute('data-status') == 'dead') {
          this.className = "alive";
          this.setAttribute('data-status', 'alive');
        } else {
          this.className = "dead";
          this.setAttribute('data-status', 'dead');
        }
      };
  
  
        var allCells = document.getElementsByTagName("td");
        var cellArray = Array.from(allCells);
        cellArray.forEach(function(cell){
         cell.onclick = onCellClick;
        });
  
      var clearButton = document.getElementById('clear_btn');
      clearButton.onclick = resetBoard;
  
      var randomButton = document.getElementById("reset_btn");
      randomButton.onclick = resetRandom;
  
      var stepButton = document.getElementById("step_btn");
      stepButton.onclick = gameOfLife.step;
  
      var playButton = document.getElementById("play_btn");
      playButton.onclick = gameOfLife.enableAutoPlay;
  
      function resetBoard() {
        cellArray.forEach(function(cell){
          cell.className = "dead";
          cell.setAttribute('data-status', 'dead');
        });
      }
  
      function resetRandom() {
        resetBoard();
        var numOfSquares = Math.ceil(Math.random() * 144);
        var xCoordinate = Math.ceil(Math.random() * 12);
        var yCoordinate = Math.ceil(Math.random() * 12);
        var coordinateArr = [];
        for(var i = 0; i < numOfSquares; i++) {
          coordinateArr.push([xCoordinate, yCoordinate]);
        }
        debugger;
        coordinateArr.forEach(function(coor){
          var randoCell = document.getElementById(""+coor[0]+"-"+coor[1]+"");
          randoCell.setAttribute('data-status', 'alive');
          randoCell.className = "alive";
        });
      }
  
  
    },
  
  
  
    step: function () {
      // Here is where you want to loop through all the cells
      // on the board and determine, based on it's neighbors,
      // whether the cell should be dead or alive in the next
      // evolution of the game.
      //
      // You need to:
      // 1. Count alive neighbors for all cells
      // 2. Set the next state of all cells based on their alive neighbors
      var allCells = document.getElementsByTagName("td");
      var cellArray = Array.from(allCells);
      cellArray.forEach(function(cell){
  
        var dash = cell.getAttribute("id").indexOf("-");
        var x = parseInt(cell.getAttribute("id").slice(0, dash), 10);
        var y = parseInt(cell.getAttribute("id").slice(dash + 1), 10);
  
  
        var neighborArray = [
                {x : x-1,   y : y-1},
                {x : x,     y : y-1},
                {x : x+1,   y : y-1},
                {x : x-1,   y : y},
                {x : x+1,   y : y},
                {x : x-1,   y : y+1},
                {x : x,     y : y+1},
                {x : x+1,   y : y+1}
        ];
  
        console.log(neighborArray);
        var neighborsSelector = [];
  
        neighborArray.forEach(function(coord){
          if ((0 <= coord.x) &&
              (coord.x < 12) &&
              (0 <= coord.y) &&
              (coord.y < 12) ){
  
            console.log(coord.x, coord.y);
            neighborsSelector.push(`${coord.x}-${coord.y}`);
          }
        });
  
        console.log(neighborsSelector);
        var count = 0;
        neighborsSelector.forEach(function(neighbor){
          var neighborCell = document.getElementById(neighbor);
          if (neighborCell.className === 'alive'){
            count++;
          }
        });
  
        if (count < 2) {
          cell.setAttribute('title', 'dead');
        } else if (count === 3) {
          cell.setAttribute('title', 'alive');
        } else if (count > 3) {
          cell.setAttribute('title', 'dead');
        }
  
      });
  
      cellArray.forEach(function(cell){
        if (cell.getAttribute("title")==="dead") {
          cell.className = 'dead';
          cell.setAttribute('data-status', 'dead');
        } else if (cell.getAttribute("title")==="alive") {
          cell.className = 'alive';
          cell.setAttribute('data-status', 'alive');
        }
      });
  
  
  
    },
  
    enableAutoPlay: function () {
      // Start Auto-Play by running the 'step' function
      // automatically repeatedly every fixed time interval
      setInterval(gameOfLife.step, 1000);
    }
  
  };
  
    gameOfLife.createAndShowBoard();