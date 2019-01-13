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


window.createBoards = function (n) {       
  const emptyBoard = [],
      bigArray = [];
  for (let i = 0; i < n; i++) {
    emptyBoard.push([]);
    for (let j = 0; j < n; j++) {
      bigArray.push(0);
    }
  }
  return [bigArray, emptyBoard];
};

window.makeArrayToCheck = function(currentIndex, n, direction, array) {
  let lowerEnd = direction ? (currentIndex % n === 0) : (currentIndex % n === n - 1),
      upperEnd = direction ? (currentIndex % n === n - 1): (currentIndex % n === 0),
      diagCounter = 1;
  const diagIncrease = direction ? n + 1 : n - 1,
        diagArray = [];
  while (lowerEnd === false || upperEnd === false) {
    if (lowerEnd === false) {
      const currentLowerPosition = (currentIndex) - (diagCounter * diagIncrease),
            caluclatedLower = direction ? (currentLowerPosition % n === 0) : (currentLowerPosition % n === n - 1);
      if (currentLowerPosition >= 0) {
        diagArray.push(array[currentLowerPosition]);
      }
      if (caluclatedLower || currentLowerPosition < 0) {
        lowerEnd = true;
      }
    }
    if (upperEnd === false) {
      const currentUpperPosition = (currentIndex) + (diagCounter * diagIncrease),
            caluclatedUpper = direction ? (currentUpperPosition % n === n - 1) : (currentUpperPosition % n === 0);
      if (currentUpperPosition < array.length) {
        diagArray.push(array[currentUpperPosition]);
      }
      if (caluclatedUpper || currentUpperPosition >= array.length) {
        upperEnd = true;
      }
    }
    diagCounter++;
  }
  return diagArray;
};

window.makeMatrix = function(emptyArray, n, array) {
  for (let i = 0; i < array.length; i++) {
    const placeRow = Math.floor(i / n);
    emptyArray[placeRow].push(array[i]);
  }
  return emptyArray;
};

window.checkRookCollisions = function(index, n, array, row) {
  const rowStart = (row * n),
        rowEnd = ((row + 1) * n) - 1,
        colArr = [],
        topOfColumn = index % n;
  for (let j = topOfColumn; j < array.length; j += n) {
    colArr.push(array[j]);
  }
  if (Board.prototype.hasColConflictAt(colArr, 1) || 
      Board.prototype.hasRowConflictAt(array.slice(rowStart, rowEnd + 1), 1)) {
    return true;
  }
  return false;
};

window.checkCollisions = function(index, n, array, row) {
  const minorDiagArray = makeArrayToCheck(index, n, false, array),
        majorDiagArray = makeArrayToCheck(index, n, true, array);
  if (Board.prototype.hasMinorDiagonalConflictAt(minorDiagArray, 1) || 
      Board.prototype.hasMajorDiagonalConflictAt(majorDiagArray, 1) || 
      checkRookCollisions(index, n, array, row)) {
    return true;
  }
  return false;
};




window.findNRooksSolution = function(n) {
  let [bigArray, solution] = createBoards(n),
      placedRooks = 0;
  for (let i = 0; i < bigArray.length; i++) {
    const row = Math.floor(i / n);
    if (checkRookCollisions(i, n, bigArray, row)) {
      continue;
    } else {
      bigArray[i] = 1;
    }
    placedRooks++;
  }
  if (placedRooks === n) {
    solution = makeMatrix(solution, n, bigArray);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.countNRooksSolutions = function(n) {
  let num = 1;
  for (let i = 1; i <= n; i++) {
    num *= i;
  }
  return num;
  // let solutionCount = 0,
  //     [bigArray] = createBoards(n);

  // const findNTimes = function (currentBoard, row, piecesPlaced) {
  //   let workingBoard = [...currentBoard];
  //   for (let i = 0; i < n; i ++) {
  //     let placedPieces = piecesPlaced,
  //         currentIndex = i + (row * n);
  //     if (i > 0) {
  //       workingBoard[currentIndex - 1] = 0;
  //     }
  //     if (checkRookCollisions(currentIndex, n, workingBoard, row)) {
  //       continue;
  //     } else {
  //       workingBoard[currentIndex] = 1;
  //     }
  //     placedPieces++;
  //     if (row === n - 1) {
  //       if (placedPieces === n) {
  //         solutionCount++;
  //       }
  //     } else {
  //       findNTimes(workingBoard, row + 1, placedPieces);
  //     }
  //   }
  // }; 

  // findNTimes(bigArray, 0, 0);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
};


window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  }
  let solutionFound = false,
      [bigArray, solution] = createBoards(n);

  const findNTimes = function (currentBoard, row, piecesPlaced) {
    let workingBoard = [...currentBoard];
    for (let i = 0; i < n; i ++) {
      if (solutionFound === true) {
        return;
      }
      let currentIndex = i + (row * n),
          placedPieces = piecesPlaced;
      if (i > 0) {
        workingBoard[currentIndex - 1] = 0;
      }
      if (checkCollisions(currentIndex, n, workingBoard, row)) {
        continue;
      } else {
        workingBoard[currentIndex] = 1
      }
      placedPieces++;
      if (row === n - 1) {
        if (placedPieces === n && solution[0].length === 0) {
          solution = makeMatrix(solution, n, workingBoard);
          solutionFound = true;
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
  let solutionCount = 0,
      [bigArray] = createBoards(n);

  const findNTimes = function (currentBoard, row, piecesPlaced) {
    let workingBoard = [...currentBoard];
    for (let i = 0; i < n; i ++) {
      let placedPieces = piecesPlaced,
          currentIndex = i + (row * n);
      if (i > 0) {
        workingBoard[currentIndex - 1] = 0;
      }
      if (checkCollisions(currentIndex, n, workingBoard, row)) {
        continue;
      } else {
        workingBoard[currentIndex] = 1
      }
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
