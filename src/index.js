module.exports = function solveSudoku(matrix) {
  const size = 9;
  const boxSize = 3;

  const findEmpty = (matrix) => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (matrix[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return null;
  }

  const validate = (num, pos, matrix) => {
    const [i, j] = pos;

    /*Check rows*/
    for (let h = 0; h < size; h++) {
      if (matrix[h][j] === num && h !== i) {
        return false;
      }
    }

    /*Check cols*/
    for (let h = 0; h < size; h++) {
      if (matrix[i][h] === num && h !== j) {
        return false;
      }
    }

    /*Check box*/
    const boxRow = Math.floor(i / boxSize) * boxSize;
    const boxCol = Math.floor(j / boxSize) * boxSize;

    for (let h = boxRow; h < boxRow + boxSize; h++) {
      for (let g = boxCol; g < boxCol + boxSize; g++) {
        if (matrix[h][g] === num && h !== i && g !== j) {
          return false;
        }
      }
    }

    return true;
  }

  const solution = () => {
    const currentPosition = findEmpty(matrix);

    if (currentPosition === null) {
      return true;
    }

    for (let k = 1; k < size + 1; k++) {
      const currentNum = k;
      const isValid = validate(currentNum, currentPosition, matrix)

      if (isValid) {
        const [x, y] = currentPosition;
        matrix[x][y] = currentNum;

        if (solution()) {
          return true;
        }

        matrix[x][y] = 0;
      }
    }

    return false;
  }

  solution();
  return matrix;
}
