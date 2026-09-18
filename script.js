```javascript
const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],

    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],

    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

let board = JSON.parse(JSON.stringify(puzzle));

function createBoard() {
    const sudokuBoard = document.getElementById("sudoku-board");
    sudokuBoard.innerHTML = "";

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            const input = document.createElement("input");

            input.type = "text";
            input.maxLength = 1;
            input.className = "cell";

            if (board[row][col] !== 0) {
                input.value = board[row][col];
                input.readOnly = true;
            }

            input.dataset.row = row;
            input.dataset.col = col;

            input.addEventListener("input", function () {
                if (!/^[1-9]$/.test(this.value)) {
                    this.value = "";
                } else {
                    board[row][col] = Number(this.value);
                }
            });

            sudokuBoard.appendChild(input);
        }
    }
}

function isValid(board, row, col, num) {

    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num && i !== col) {
            return false;
        }

        if (board[i][col] === num && i !== row) {
            return false;
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (
                board[i][j] === num &&
                (i !== row || j !== col)
            ) {
                return false;
            }
        }
    }

    return true;
}

function solve(board) {

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            if (board[row][col] === 0) {

                for (let num = 1; num <= 9; num++) {

                    if (isValid(board, row, col, num)) {

                        board[row][col] = num;

                        if (solve(board)) {
                            return true;
                        }

                        board[row][col] = 0;
                    }
                }

                return false;
            }
        }
    }

    return true;
}

function solveSudoku() {

    const solution = JSON.parse(JSON.stringify(board));

    if (solve(solution)) {
        board = solution;
        createBoard();

        document.getElementById("message").textContent =
            "Sudoku solved!";
    } else {
        document.getElementById("message").textContent =
            "No solution exists.";
    }
}

function checkSolution() {

    const testBoard = JSON.parse(JSON.stringify(board));

    if (solve(testBoard)) {

        let complete = true;

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    complete = false;
                }
            }
        }

        if (complete) {
            document.getElementById("message").textContent =
                "Correct! Sudoku completed!";
        } else {
            document.getElementById("message").textContent =
                "Keep going! Some cells are still empty.";
        }

    } else {
        document.getElementById("message").textContent =
            "There is an error in your Sudoku.";
    }
}

function newGame() {
    board = JSON.parse(JSON.stringify(puzzle));
    document.getElementById("message").textContent = "";
    createBoard();
}

createBoard();
```
