const minesweeper = {
    width: 12,
    height: 12,
    stepInterval: null,
  
    createAndShowBoard: function () {
      // create <table> element
      const table = document.createElement("tbody");
  
      // build Table HTML
      const tablehtml = '';
      for (const h = 0; h < this.height; h++) {
        tablehtml += "<tr id='row+" + h + "'>";
        for (const w = 0; w < this.width; w++) {
          tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
        }
        tablehtml += "</tr>";
      }
      table.innerHTML = tablehtml;
  
      // add table to the #board element
      const board = document.getElementById('board');
      board.appendChild(table);
  
      // once html elements are added to the page, attach events to them
      this.setupBoardEvents();
    },
  
    forEachCell: function (iteratorFunc) {
      const allCells = document.getElementsByTagName("td");
      const cellArray = Array.from(allCells);
      cellArray.forEach(function(cell){
        iteratorFunc(cell);
      });
    },
  
    setupBoardEvents: function() {

      function explode() {

      }

      function reveal() {

      }

      function onCellClick(e) {
        if (this.getAttribute('mine') === true) {
          this.className = 'mine';
          explode();
        } else {
          this.className = 'safe';
          reveal();
        }
      };
  
      const allCells = document.getElementsByTagName("td");
      const cellArray = Array.from(allCells);
      cellArray.forEach(function(cell){
        cell.onclick = onCellClick;
      });
  
      const clearButton = document.getElementById('clear_btn');
      clearButton.onclick = resetBoard;
  
      const randomButton = document.getElementById("reset_btn");
      randomButton.onclick = resetRandom;
  
      const stepButton = document.getElementById("step_btn");
      stepButton.onclick = gameOfLife.step;
  
      const playButton = document.getElementById("play_btn");
      playButton.onclick = gameOfLife.enableAutoPlay;
  
      function resetBoard() {
        cellArray.forEach(function(cell){
          cell.className = "dead";
          cell.setAttribute('data-status', 'dead');
        });
      }
    },
    step: function () {
      const allCells = document.getElementsByTagName("td");
      const cellArray = Array.from(allCells);
      cellArray.forEach(function(cell){
  
        const dash = cell.getAttribute("id").indexOf("-");
        const x = parseInt(cell.getAttribute("id").slice(0, dash), 10);
        const y = parseInt(cell.getAttribute("id").slice(dash + 1), 10);
  
        const neighborArray = [
          {x : x-1,   y : y-1},
          {x : x,     y : y-1},
          {x : x+1,   y : y-1},
          {x : x-1,   y : y},
          {x : x+1,   y : y},
          {x : x-1,   y : y+1},
          {x : x,     y : y+1},
          {x : x+1,   y : y+1}
        ];
        const neighborsSelector = [];
  
        neighborArray.forEach(function(coord){
          if ((0 <= coord.x) &&
              (coord.x < 12) &&
              (0 <= coord.y) &&
              (coord.y < 12) ){
            console.log(coord.x, coord.y);
            neighborsSelector.push(`${coord.x}-${coord.y}`);
          }
        });
  
        const count = 0;

        neighborsSelector.forEach(function(neighbor){
          const neighborCell = document.getElementById(neighbor);
          if (neighborCell.getAttribute('mine') === true){
            count++;
          }
        });
        
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
  
  
  
    }
  };
  
minesweeper.createAndShowBoard();