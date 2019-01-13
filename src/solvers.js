/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


/* creates the single array (bigArray) that all calculations and math will be made on,
 and a template array with nested arrays to return a solution on (emptyBoard) */
window.createBoards = function (n) {  
  const emptyBoard = [],
      bigArray = [];
  for (let i = 0; i < n; i++) {   //separate for loops because the emptyBoard only needs n-times rows
    emptyBoard.push([]);
    for (let j = 0; j < n; j++) { //whereas bigArray also needs n-times 0's in each row
      bigArray.push(0);
    }
  }
  return [bigArray, emptyBoard];
};


/*This is the logic to create diagonal arrays to check for collisions*/
window.makeArrayToCheck = function(currentIndex, n, direction, array) {
  let lowerIndexEnd = direction ? (currentIndex % n === 0) : (currentIndex % n === n - 1), //lowerIndexEnd and upperIndexEnd are the calculated starts or ends of a row
      upperIndexEnd = direction ? (currentIndex % n === n - 1): (currentIndex % n === 0),  //indicating when the algorithm should stop adding values to the array to check
      diagCounter = 1;                                                                     //diagCounter is increased and used to find the next diagonal spot (when multiplied by diagIncrease)
  const diagIncrease = direction ? n + 1 : n - 1,                                          //diagIncrease is how far apart the diagonal indexes are (n + 1 is for major, n - 1 is for minor)
        diagArray = [];                                                                    //diagArray is the array being built to check for collisions
  while (lowerIndexEnd === false || upperIndexEnd === false) {                             
    if (lowerIndexEnd === false) {
      const currentLowerPosition = (currentIndex) - (diagCounter * diagIncrease),
            caluclatedLower = direction ? (currentLowerPosition % n === 0) : (currentLowerPosition % n === n - 1);
      if (currentLowerPosition >= 0) diagArray.push(array[currentLowerPosition]);
      if (caluclatedLower || currentLowerPosition < 0) lowerIndexEnd = true;               //lower/upperIndexEnd get set to true when either the the current position is at the end/start of a row
    }                                                                                      //or the current position is below/above the range of the array
    if (upperIndexEnd === false) {
      const currentUpperPosition = (currentIndex) + (diagCounter * diagIncrease),
            caluclatedUpper = direction ? (currentUpperPosition % n === n - 1) : (currentUpperPosition % n === 0);
      if (currentUpperPosition < array.length) diagArray.push(array[currentUpperPosition]);
      if (caluclatedUpper || currentUpperPosition >= array.length) upperIndexEnd = true;
    }
    diagCounter++;
  }
  return diagArray;
};

/* Converts the working array with all indices into an n x n array for output*/
window.makeSolutionMatrix = function(emptyArray, n, array) {
  for (let i = 0; i < array.length; i++) {
    const placeRow = Math.floor(i / n);
    emptyArray[placeRow].push(array[i]);
  }
  return emptyArray;
};

/* Checks if there is a column or row collision */
window.checkRookCollisions = function(index, n, array, row) {
  const rowStart = (row * n),
        rowEnd = ((row + 1) * n) - 1,
        colArr = [],
        topOfColumn = index % n;
  for (let j = topOfColumn; j < array.length; j += n) {
    colArr.push(array[j]);
  }
  if (Board.prototype.hasArrayConflictAt(colArr, 1) || 
      Board.prototype.hasArrayConflictAt(array.slice(rowStart, rowEnd + 1), 1)) {
    return true;
  }
  return false;
};

/* Checks for any rook collisions or any diagonals */
window.checkQueenCollisions = function(index, n, array, row) {
  const minorDiagArray = makeArrayToCheck(index, n, false, array),
        majorDiagArray = makeArrayToCheck(index, n, true, array);
  if (Board.prototype.hasArrayConflictAt(minorDiagArray, 1) || 
      Board.prototype.hasArrayConflictAt(majorDiagArray, 1) || 
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
    if (checkRookCollisions(i, n, bigArray, row)) continue;
    else bigArray[i] = 1;
    placedRooks++;
  }
  if (placedRooks === n) solution = makeSolutionMatrix(solution, n, bigArray);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.countNRooksSolutions = function(n) {
  // let num = 1;
  // for (let i = 1; i <= n; i++) {
  //   num *= i;
  // }
  // return num;

  let solutionCount = 0,
      [bigArray] = createBoards(n);

  const findSolutionRecursion = function (currentBoard, row, piecesPlaced) {
    const workingBoard = [...currentBoard];
    for (let i = 0; i < n; i ++) {
      let placedPieces = piecesPlaced;
      const currentIndex = i + (row * n);
      if (i > 0) workingBoard[currentIndex - 1] = 0;  //resets the previous iterations placement
      if (checkRookCollisions(currentIndex, n, workingBoard, row)) continue;
      else workingBoard[currentIndex] = 1;
      placedPieces++;
      if (row === n - 1 && placedPieces === n) solutionCount++;
      else findSolutionRecursion(workingBoard, row + 1, placedPieces);
    }
  }; 
  findSolutionRecursion(bigArray, 0, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


window.findNQueensSolution = function(n) {
  if (n === 0) return [];
  let solutionFound = false,
      [bigArray, solution] = createBoards(n);
  const findSolutionRecursion = function (currentBoard, row, piecesPlaced) {
    const workingBoard = [...currentBoard];
    for (let i = 0; i < n; i ++) {
      if (solutionFound) return;
      const currentIndex = i + (row * n);
      let placedPieces = piecesPlaced;
      if (i > 0)  workingBoard[currentIndex - 1] = 0;  //resets the previous iterations placement
      if (checkQueenCollisions(currentIndex, n, workingBoard, row)) continue;
      else workingBoard[currentIndex] = 1;
      placedPieces++;
      if (row === n - 1 && placedPieces === n && solution[0].length === 0) {
        solution = makeSolutionMatrix(solution, n, workingBoard);
        solutionFound = true;
      } else findSolutionRecursion(workingBoard, row + 1, placedPieces);
    }
  };
  findSolutionRecursion(bigArray, 0, 0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


window.countNQueensSolutions = function(n) {
  if (n === 0) return 1;
  let solutionCount = 0,
      [bigArray] = createBoards(n);
  const findSolutionRecursion = function (currentBoard, row, piecesPlaced) {
    const workingBoard = [...currentBoard];
    for (let i = 0; i < n; i ++) {
      let placedPieces = piecesPlaced,
          currentIndex = i + (row * n);
      if (i > 0) workingBoard[currentIndex - 1] = 0;  //resets the previous iterations placement
      if (checkQueenCollisions(currentIndex, n, workingBoard, row)) continue;
      else workingBoard[currentIndex] = 1;
      placedPieces++;
      if (row === n - 1 && placedPieces === n) solutionCount++;
      else findSolutionRecursion(workingBoard, row + 1, placedPieces);
    }
  }; 
  findSolutionRecursion(bigArray, 0, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
