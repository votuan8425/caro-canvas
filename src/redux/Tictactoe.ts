import { ITictactoe, TBoard, TCell, TCells, initialTictactoe } from "../types/types";

export default class Tictactoe {

    tictactoe: ITictactoe = Object.assign({}, initialTictactoe);
    moveStack: ITictactoe[] = [];
    redoStack: ITictactoe[] = [];

    constructor(_tictactoe: ITictactoe) {
        this.reset(_tictactoe);
    }

    reset(_tictactoe: ITictactoe) {
        this.tictactoe = {
            ...this.tictactoe,
            board: _tictactoe.board,
            nextPlayer: _tictactoe.nextPlayer,
            winner: _tictactoe.winner,
        };

        this.tictactoe.winner = this.getWinner();
    }

    get board() {
        return this.tictactoe.board;
    }

    get nextPlayer() {
        return this.tictactoe.nextPlayer;
    }

    get winner() {
        return this.tictactoe.winner;
    }

    hasWon(threeCells: TCell[]): boolean {
        const player = this.board[threeCells[0]];
        for (let i = 1; i < threeCells.length; i++) {
            if (this.board[threeCells[i]] !== player) {
                return false;
            }
        }
        return true;
    }

    getEmptyCells(): TCells {
        const cells: TCells = [];
        for (let i = 0; i < 400; i++) {
            if (!this.board[i]) cells.push(i);
        }
        return cells;
    }

    getWinner(): number {
        const board = this.tictactoe.board;
        const size = board.length; // Assuming the board is a square grid (size x size)

        // console.log("board ", board)

        // Check rows
        for (let row = 0; row < size; row++) {
            for (let col = 0; col <= size - 5; col++) {
                const cell = board[row][col];
                if (cell !== 0) {
                    let foundWinner = true;
                    for (let i = 1; i < 5; i++) {
                        if (cell !== board[row][col + i]) {
                            foundWinner = false;
                            break;
                        }
                    }
                    if (foundWinner) {
                        return cell;
                    }
                }
            }
        }

        // Check columns
        for (let col = 0; col < size; col++) {
            for (let row = 0; row <= size - 5; row++) {
                const cell = board[row][col];
                if (cell !== 0) {
                    let foundWinner = true;
                    for (let i = 1; i < 5; i++) {
                        if (cell !== board[row + i][col]) {
                            foundWinner = false;
                            break;
                        }
                    }
                    if (foundWinner) {
                        return cell;
                    }
                }
            }
        }

        // Check diagonals (top-left to bottom-right)
        for (let row = 0; row <= size - 5; row++) {
            for (let col = 0; col <= size - 5; col++) {
                const cell = board[row][col];
                if (cell !== 0) {
                    let foundWinner = true;
                    for (let i = 1; i < 5; i++) {
                        if (cell !== board[row + i][col + i]) {
                            foundWinner = false;
                            break;
                        }
                    }
                    if (foundWinner) {
                        return cell;
                    }
                }
            }
        }

        // Check diagonals (top-right to bottom-left)
        for (let row = 0; row <= size - 5; row++) {
            for (let col = 4; col < size; col++) {
                const cell = board[row][col];
                if (cell !== 0) {
                    let foundWinner = true;
                    for (let i = 1; i < 5; i++) {
                        if (cell !== board[row + i][col - i]) {
                            foundWinner = false;
                            break;
                        }
                    }
                    if (foundWinner) {
                        return cell;
                    }
                }
            }
        }

        // No winner, return 0
        return 0;
    }

    getWinningCells(): [number, number][] {
        const winningCells: [number, number][] = [];
        const board = this.tictactoe.board;
        const size = board.length; // Assuming the board is a square grid (size x size)

        // Check rows
        for (let row = 0; row < size; row++) {
            for (let col = 0; col <= size - 5; col++) {
                const cells: [number, number][] = [];
                let foundWinner = true;
                for (let i = 0; i < 5; i++) {
                    const cell = board[row][col + i];
                    cells.push([row, col + i]);
                    if (cell === 0 || cell !== board[row][col]) {
                        foundWinner = false;
                        break;
                    }
                }
                if (foundWinner) {
                    winningCells.push(...cells);
                }
            }
        }

        // Check columns
        for (let col = 0; col < size; col++) {
            for (let row = 0; row <= size - 5; row++) {
                const cells: [number, number][] = [];
                let foundWinner = true;
                for (let i = 0; i < 5; i++) {
                    const cell = board[row + i][col];
                    cells.push([row + i, col]);
                    if (cell === 0 || cell !== board[row][col]) {
                        foundWinner = false;
                        break;
                    }
                }
                if (foundWinner) {
                    winningCells.push(...cells);
                }
            }
        }

        // Check diagonals (top-left to bottom-right)
        for (let row = 0; row <= size - 5; row++) {
            for (let col = 0; col <= size - 5; col++) {
                const cells: [number, number][] = [];
                let foundWinner = true;
                for (let i = 0; i < 5; i++) {
                    const cell = board[row + i][col + i];
                    cells.push([row + i, col + i]);
                    if (cell === 0 || cell !== board[row][col]) {
                        foundWinner = false;
                        break;
                    }
                }
                if (foundWinner) {
                    winningCells.push(...cells);
                }
            }
        }

        // Check diagonals (top-right to bottom-left)
        for (let row = 0; row <= size - 5; row++) {
            for (let col = 4; col < size; col++) {
                const cells: [number, number][] = [];
                let foundWinner = true;
                for (let i = 0; i < 5; i++) {
                    const cell = board[row + i][col - i];
                    cells.push([row + i, col - i]);
                    if (cell === 0 || cell !== board[row][col]) {
                        foundWinner = false;
                        break;
                    }
                }
                if (foundWinner) {
                    winningCells.push(...cells);
                }
            }
        }

        return winningCells;
    }


    updateWinner() {
        const winner = this.getWinner();
        this.tictactoe.winner = winner;
    }


    validMove(move: TCell): boolean {
        return move >= 0 && move < this.board.length;
    }

    setCell(board: TBoard, move: TCell): TBoard {
        return board.map((cell, i) => (i === move ? this.tictactoe.nextPlayer : cell)) as TBoard;
    }

    makeMove(move: TCell) {
        const size = this.tictactoe.board.length;
        const row = Math.floor(move / size);
        const col = move % size;

        const newBoard = this.tictactoe.board.map((rowArray) => [...rowArray]);

        if (newBoard[row][col] === 0 && this.tictactoe.winner === 0) {
            newBoard[row][col] = this.tictactoe.nextPlayer;
            this.tictactoe = {
                board: newBoard,
                nextPlayer: this.tictactoe.nextPlayer === 1 ? 2 : 1,
                winner: this.getWinner(),
            };
            this.updateWinner();
        }

        // Push the current state onto the move stack
        this.moveStack.push({ ...this.tictactoe });

        return this.tictactoe;
    }
    undoMove() {
        if (this.moveStack.length > 1) {
            const lastMove = this.moveStack.pop();
            if (lastMove) {
                this.redoStack.push(lastMove);
            }
            this.tictactoe = { ...this.moveStack[this.moveStack.length - 1] };
        }
        return this.tictactoe;
    }

}