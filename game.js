const minesweeper = {
  createAndShowBoard: function (height, width) {
    // create <table> element
    const table = document.createElement("tbody");

    // build Table HTML
    const tablehtml = '';
    for (const h = 0; h < height; h++) {
      tablehtml += `<tr id="row${h}>`;
      for (const w = 0; w < width; w++) {
        tablehtml += `<td data-status='dead' id="${w}-${h}"></td>`;
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
      this.forEachCell(function(cell) {
        if (cell.getAttribute('mine') === true) {
          cell.className = 'mine';
        } else {
          cell.className = 'revealed';
        }
      });
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

    this.forEachCell(function(cell) {
      cell.onclick = onCellClick;
    });
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

const easyGameButton = document.getElementById('start-easy-btn');
easyGameButton.onclick = () => minesweeper.createAndShowBoard(10, 10);

const mediumGameButton = document.getElementById('start-medium-btn');
mediumGameButton.onclick = () => minesweeper.createAndShowBoard(20, 20);

const hardGameButton = document.getElementById('start-hard-btn');
hardGameButton.onclick = () => minesweeper.createAndShowBoard(30, 30);
