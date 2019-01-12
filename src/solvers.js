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

  //major = n + 1
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
      let currentIndex = i + (row * n);
      if (Board.prototype.hasRowConflictAt(workingBoard.slice(rowStart, rowEnd + 1), 1)) {
        workingBoard[currentIndex] = 0;
        continue;
      }
      let colArr = [];
      // let topOfCol = i;
      for (let j = i; j < workingBoard.length; j += n) {
        colArr.push(workingBoard[j]);
      }
      if (Board.prototype.hasColConflictAt(colArr, 1)) {
        workingBoard[currentIndex] = 0;
        continue;
      }
      

      workingBoard[currentIndex] = 1;
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
  if (n === 0) {
    return 1;
  }
  var solution = []; //fixme
  let board = []; //new Board({n:n});
  // let counter = 0;
  for (let i = 0; i < n; i++) {
    let tempArr = [];
    // console.log ('does solution correction get arrays?1', solution);
    solution.push([]);
    // console.log ('does solution correction get arrays?2', solution);
    for (let k = 0; k < n; k++) {
      tempArr.push(0);
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
      let currentIndex = i + (row * n);
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
      //Minor first     Current location workingBoard[currentIndex]
      let lowerMinorEnd = (currentIndex % n === n - 1);
      let upperMinorEnd = (currentIndex % n === 0);
      let minorDiagArray = [];
      let minorDiagIncrease = n - 1;
      let minorDiagCounter = 1;
      while (lowerMinorEnd === false || upperMinorEnd === false) {
        if (lowerMinorEnd === false) {
          let currentLowerPosition = (currentIndex) - (minorDiagCounter * minorDiagIncrease);
          let caluclatedLower = (currentLowerPosition % n === n - 1);
          if (currentLowerPosition >= 0) {
            minorDiagArray.push(workingBoard[currentLowerPosition]);
          }
          if (caluclatedLower || currentLowerPosition < 0) {
            lowerMinorEnd = true;
          }
        }
        if (upperMinorEnd === false) {
          let currentUpperPosition = (currentIndex) + (minorDiagCounter * minorDiagIncrease);
          let caluclatedUpper = (currentUpperPosition % n === 0);
          if (currentUpperPosition < workingBoard.length) {
            minorDiagArray.push(workingBoard[currentUpperPosition]);
          }
          if (caluclatedUpper || currentUpperPosition >= workingBoard.length) {
            upperMinorEnd = true;
          }
        }
        minorDiagCounter++;
      }
      if (Board.prototype.hasMinorDiagonalConflictAt(minorDiagArray, 1)) {
        workingBoard[currentIndex] = 0;
        continue;
      }
      let lowerMajorEnd = (currentIndex % n === 0);
      let upperMajorEnd = (currentIndex % n === n - 1);
      let majorDiagArray = [];
      let majorDiagIncrease = n + 1;
      let majorDiagCounter = 1;
      while (lowerMajorEnd === false || upperMajorEnd === false) {
        if (lowerMajorEnd === false) {
          let currentLowerPosition = (currentIndex) - (majorDiagCounter * majorDiagIncrease);
          let caluclatedLower = (currentLowerPosition % n === 0);
          if (currentLowerPosition >= 0) {
            majorDiagArray.push(workingBoard[currentLowerPosition]);
          }
          if (caluclatedLower || currentLowerPosition < 0) {
            lowerMajorEnd = true;
          }
        }
        if (upperMajorEnd === false) {
          let currentUpperPosition = (currentIndex) + (majorDiagCounter * majorDiagIncrease);
          let caluclatedUpper = (currentUpperPosition % n === n - 1);
          if (currentUpperPosition < workingBoard.length) {
            majorDiagArray.push(workingBoard[currentUpperPosition]);
          }
          if (caluclatedUpper || currentUpperPosition >= workingBoard.length) {
            upperMajorEnd = true;
          }
        }
        majorDiagCounter++;
      }
      if (Board.prototype.hasMajorDiagonalConflictAt(majorDiagArray, 1)) {
        workingBoard[currentIndex] = 0;
        continue;
      }
      workingBoard[i + (row * n)] = 1;
      placedPieces++;
      if (row === n - 1) {
        if (placedPieces === n && solution[0].length === 0) {
          for (let i = 0; i < workingBoard.length; i++) {
            let placeRow = Math.floor(i / n);
            solution[placeRow].push(workingBoard[i]);
          }
        }
      } else {
        findNTimes(workingBoard, row + 1, placedPieces);
      }
    }
  }; 

  findNTimes(bigArray, 0, 0);




  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0; //fixme
  let board = []; //new Board({n:n});
  // let counter = 0;
  for (let i = 0; i < n; i++) {
    let tempArr = [];
    // console.log ('does solution correction get arrays?1', solution);
    // solution.push([]);
    // console.log ('does solution correction get arrays?2', solution);
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
      let currentIndex = i + (row * n);
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
      //Minor first     Current location workingBoard[currentIndex]
      let lowerMinorEnd = (currentIndex % n === n - 1);
      let upperMinorEnd = (currentIndex % n === 0);
      let minorDiagArray = [];
      let minorDiagIncrease = n - 1;
      let minorDiagCounter = 1;
      while (lowerMinorEnd === false || upperMinorEnd === false) {
        if (lowerMinorEnd === false) {
          let currentLowerPosition = (currentIndex) - (minorDiagCounter * minorDiagIncrease);
          let caluclatedLower = (currentLowerPosition % n === n - 1);
          if (currentLowerPosition >= 0) {
            minorDiagArray.push(workingBoard[currentLowerPosition]);
          }
          if (caluclatedLower || currentLowerPosition < 0) {
            lowerMinorEnd = true;
          }
        }
        if (upperMinorEnd === false) {
          let currentUpperPosition = (currentIndex) + (minorDiagCounter * minorDiagIncrease);
          let caluclatedUpper = (currentUpperPosition % n === 0);
          if (currentUpperPosition < workingBoard.length) {
            minorDiagArray.push(workingBoard[currentUpperPosition]);
          }
          if (caluclatedUpper || currentUpperPosition >= workingBoard.length) {
            upperMinorEnd = true;
          }
        }
        minorDiagCounter++;
      }
      if (Board.prototype.hasMinorDiagonalConflictAt(minorDiagArray, 1)) {
        workingBoard[currentIndex] = 0;
        continue;
      }
      let lowerMajorEnd = (currentIndex % n === 0);
      let upperMajorEnd = (currentIndex % n === n - 1);
      let majorDiagArray = [];
      let majorDiagIncrease = n + 1;
      let majorDiagCounter = 1;
      while (lowerMajorEnd === false || upperMajorEnd === false) {
        if (lowerMajorEnd === false) {
          let currentLowerPosition = (currentIndex) - (majorDiagCounter * majorDiagIncrease);
          let caluclatedLower = (currentLowerPosition % n === 0);
          if (currentLowerPosition >= 0) {
            majorDiagArray.push(workingBoard[currentLowerPosition]);
          }
          if (caluclatedLower || currentLowerPosition < 0) {
            lowerMajorEnd = true;
          }
        }
        if (upperMajorEnd === false) {
          let currentUpperPosition = (currentIndex) + (majorDiagCounter * majorDiagIncrease);
          let caluclatedUpper = (currentUpperPosition % n === n - 1);
          if (currentUpperPosition < workingBoard.length) {
            majorDiagArray.push(workingBoard[currentUpperPosition]);
          }
          if (caluclatedUpper || currentUpperPosition >= workingBoard.length) {
            upperMajorEnd = true;
          }
        }
        majorDiagCounter++;
      }
      if (Board.prototype.hasMajorDiagonalConflictAt(majorDiagArray, 1)) {
        workingBoard[currentIndex] = 0;
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

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
