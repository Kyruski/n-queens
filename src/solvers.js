/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = []; 
  let board = []; //new Board({n:n});
  // let counter = 0;
  for (let i = 0; i < n; i++) {
    let tempArr = [];
    solution.push([]);
    for (let k = 0; k < n; k++) {
      tempArr.push('x');
      // counter++;
    }
    board.push(tempArr);
  }

  let bigArray = [];
  for (let i = 0; i < board.length; i++) {
    bigArray.push(...board[i]);
  }

  //major = n =+1
  //minor n -1
  //col n
  //row start = (row)*n
  //row end = ((row+1)*n)-1

  let placedRooks = 0;
  for (let i = 0; i < bigArray.length; i++) {
    let row = Math.floor(i / n);
    let rowStart = (row * n);
    let rowEnd = ((row + 1) * n) - 1;
    if (Board.prototype.hasRowConflictAt(bigArray.slice(rowStart, rowEnd + 1), 1)) {
      bigArray[i] = 0;
      continue;
    }
    let colArr = [];
    let topOfCol = i % n;
    for (let j = topOfCol; j < bigArray.length; j += n) {
      colArr.push(bigArray[j]);
    }
    if (Board.prototype.hasColConflictAt(colArr, 1)) {
      bigArray[i] = 0;
      continue;
    }
    bigArray[i] = 1;
    placedRooks++;

  }
  if (placedRooks === n) {
    for (let i = 0; i < bigArray.length; i++) {
      let placeRow = Math.floor(i / n);
      solution[placeRow].push(bigArray[i]);
    }
  }

  // console.log(board);


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; 
  let board = []; //new Board({n:n});
  // let counter = 0;
  for (let i = 0; i < n; i++) {
    let tempArr = [];
    // solution.push([]);
    for (let k = 0; k < n; k++) {
      tempArr.push('x');
      // counter++;
    }
    board.push(tempArr);
  }
  let bigArray = [];
  for (let i = 0; i < board.length; i++) {
    bigArray.push(...board[i]);
  }

  const findNTimes = function (currentBoard, row, piecesPlaced) {
    let workingBoard = [...currentBoard];
    for (let i = 0; i < n; i ++) {
      let placedPieces = piecesPlaced;
      if (i > 0) {
        workingBoard[i + (row * n) - 1] = 0;
      }
      let rowStart = (row * n);
      let rowEnd = ((row + 1) * n) - 1;
      if (Board.prototype.hasRowConflictAt(workingBoard.slice(rowStart, rowEnd + 1), 1)) {
        workingBoard[i + (row * n)] = 0;
        continue;
      }
      let colArr = [];
      // let topOfCol = i;
      for (let j = i; j < workingBoard.length; j += n) {
        colArr.push(workingBoard[j]);
      }
      if (Board.prototype.hasColConflictAt(colArr, 1)) {
        workingBoard[i + (row * n)] = 0;
        continue;
      }
      workingBoard[i + (row * n)] = 1;
      placedPieces++;
      if (row === n - 1) {
        if (placedPieces === n) {
          solutionCount++;
        }
      } else {
        findNTimes(workingBoard, row + 1, placedPieces);
      }
    }
  }; 

  findNTimes(bigArray, 0, 0);




  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
