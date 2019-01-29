const minesweeper = {
  createAndShowBoard: function (height, width) {
    this.height = height;
    this.width = width;

    function bombPlanter() {
      const num = Math.ceil(Math.random() * 10);
      if ((height === 10 && num >= 9)
        || (height === 20 && num >= 8)
        || (height === 30 && num >= 7)) {
          return 'true';
      }

      return 'false';
    }

    // create <table> element
    const table = document.getElementsByTagName("tbody")[0] || document.createElement("tbody");

    // build Table HTML
    let tablehtml = '';
    for (let h = 0; h < height; h++) {
      tablehtml += `<tr id="row${h}>`;
      for (let w = 0; w < width; w++) {
        tablehtml += `<td mine="${bombPlanter()}" id="${w}-${h}" class="hidden"></td>`;
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

    function getNeighbors(cell) {
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
            (coord.x < this.width) &&
            (0 <= coord.y) &&
            (coord.y < this.height) ){
          neighborsSelector.push(`${coord.x}-${coord.y}`);
        }
      });

      return neighborsSelector;
    }

    const explode = (clickedCell) => {
      this.forEachCell(function(cell) {
        if (cell.getAttribute('mine') === 'true') {
          cell.className = 'mine';
        } else {
          cell.className = 'revealed';
        }
      });
    }

    function reveal(cell) {
      const neighbors = getNeighbors(cell);
      const count = 0;

      neighbors.forEach(function(neighbor){
        console.log(count);
        const neighborCell = document.getElementById(neighbor);
        if (neighborCell.getAttribute('mine') === 'true') {
          count++;
        }
      });

      if (count) {
        cell.innerHTML(`${count}`);
      }
    }

    function onCellClick(e) {

      function victoryCheck() {
        const unclickedBombs = 0;
        const clickedSafeSquares = 0;
        this.forEachCell(function(cell) {
          if (cell.getAttribute('clicked') === 'false' && cell.getAttribute('mine') === 'true') {
            unclickedBombs++;
          };
          if (cell.getAttribute('clicked') === 'true' && cell.getAttribute('mine') === 'false') {
            clickedSafeSquares++;
          }
        });
    
        if ((unclickedBombs + clickedSafeSquares) === (this.height * this.width)) {
          document.getElementsByTagName('body').appendChild('<div class="victory">You Win!</div>')
        };
      }

      this.setAttribute('clicked', 'true');
      if (this.getAttribute('mine') === 'true') {
        this.className = 'mine';
        explode(this);
      } else {
        this.className = 'safe';
        reveal(this);
        victoryCheck();
        
      };
    };

    this.forEachCell(function(cell) {
      cell.onclick = onCellClick;
    });
  }
};

const easyGameButton = document.getElementById('start-easy-btn');
easyGameButton.onclick = () => { minesweeper.createAndShowBoard(10, 10); };

const mediumGameButton = document.getElementById('start-medium-btn');
mediumGameButton.onclick = () => { minesweeper.createAndShowBoard(20, 20); };

const hardGameButton = document.getElementById('start-hard-btn');
hardGameButton.onclick = () => { minesweeper.createAndShowBoard(30, 30); };
