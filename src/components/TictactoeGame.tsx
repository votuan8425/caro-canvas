import React, { useEffect, useRef } from 'react';
import { selectTictactoeState, resetTictactoe, makeMove, undoMove } from '../redux/slices/tictactoeSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import Tictactoe from '../redux/Tictactoe';
import { initialTictactoe, TBoard } from '../types/types';
import { exportBoardAsPNG } from '../utils/exportBoardAsPNG';
import ExportBoardAsPDF from './ExportBoardAsPDF';

export const CTictactoe = new Tictactoe(initialTictactoe);

const TictactoeGame: React.FC = (): React.ReactElement => {
    const dispatch = useAppDispatch();
    const tictactoeState = useAppSelector(selectTictactoeState);
    CTictactoe.reset(tictactoeState.tictactoe);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cellSize = 25;
    const boardSize = 20;
    const boardWidth = cellSize * boardSize;
    const boardHeight = cellSize * boardSize;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (context) {
            // Clear the canvas
            context.clearRect(0, 0, boardWidth, boardHeight);

            // Draw the board
            context.strokeStyle = '#000';
            context.lineWidth = 2;

            for (let x = cellSize; x < boardWidth; x += cellSize) {
                context.beginPath();
                context.moveTo(x, 0);
                context.lineTo(x, boardHeight);
                context.stroke();
            }

            for (let y = cellSize; y < boardHeight; y += cellSize) {
                context.beginPath();
                context.moveTo(0, y);
                context.lineTo(boardWidth, y);
                context.stroke();
            }

            // Draw the moves
            const board: TBoard = tictactoeState.tictactoe.board;
            for (let row = 0; row < boardSize; row++) {
                for (let col = 0; col < boardSize; col++) {
                    const value = board[row][col];
                    if (value === 1) {
                        drawX(context, col, row);
                    } else if (value === 2) {
                        drawO(context, col, row);
                    }
                }
            }

            // Highlight the winning cells
            const winner = tictactoeState.tictactoe.winner;
            if (winner !== 0) {
                const winningCells = CTictactoe.getWinningCells();
                console.log("winningCells ", winningCells)
                for (const [row, col] of winningCells) {
                    highlightCell(context, col, row, winner === 1 ? '#f00' : '#00f');
                }
            }
        }
    }, [tictactoeState]);

    const handleCellClick = (col: number, row: number) => {
        const value = tictactoeState.tictactoe.board[row][col];
        if (value === 0 && tictactoeState.tictactoe.winner === 0) {
            const index = row * boardSize + col;
            dispatch(makeMove(index));
        }
    };

    const drawX = (context: CanvasRenderingContext2D, col: number, row: number) => {
        const x = (col + 0.5) * cellSize;
        const y = (row + 0.5) * cellSize;
        context.strokeStyle = '#f00';
        context.lineWidth = 4;

        context.beginPath();
        context.moveTo(x - cellSize / 4, y - cellSize / 4);
        context.lineTo(x + cellSize / 4, y + cellSize / 4);
        context.moveTo(x - cellSize / 4, y + cellSize / 4);
        context.lineTo(x + cellSize / 4, y - cellSize / 4);
        context.stroke();
    };

    const drawO = (context: CanvasRenderingContext2D, col: number, row: number) => {
        const x = (col + 0.5) * cellSize;
        const y = (row + 0.5) * cellSize;
        const radius = (cellSize - 10) / 2;

        context.strokeStyle = '#00f';
        context.lineWidth = 4;

        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.stroke();
    };

    const highlightCell = (
        context: CanvasRenderingContext2D,
        col: number,
        row: number,
        color: string
    ) => {
        const x = col * cellSize;
        const y = row * cellSize;

        context.strokeStyle = color;
        context.lineWidth = 3;

        // Draw top-left to bottom-right diagonal line
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + cellSize, y + cellSize);
        context.stroke();

        // Draw top-right to bottom-left diagonal line
        context.beginPath();
        context.moveTo(x + cellSize, y);
        context.lineTo(x, y + cellSize);
        context.stroke();
    };


    const handleResetClick = () => {
        dispatch(resetTictactoe());
    };

    const handleUndoClick = () => {
        dispatch(undoMove());
    };

    const handleExportPNG = () => {
        if (canvasRef.current) {
            exportBoardAsPNG(canvasRef.current)
        }
    }

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={boardWidth}
                height={boardHeight}
                onClick={(e) => {
                    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const col = Math.floor(x / cellSize);
                    const row = Math.floor(y / cellSize);
                    handleCellClick(col, row);
                }}
            />
            <div className="message">
                {tictactoeState.tictactoe.winner !== 0 ? (
                    <div>
                        Message: Player
                        <b
                            style={{
                                color: `${tictactoeState.tictactoe.winner === 1 ? 'red' : 'blue'}`,
                                margin: '0 2px',
                            }}
                        >
                            {tictactoeState.tictactoe.winner === 1 ? 'X' : 'O'}
                        </b>
                        is the winner
                    </div>
                ) : (
                    <div>Good luck!!!</div>
                )}
            </div>
            <button onClick={handleResetClick}>Reset Game</button>
            <button onClick={handleUndoClick}>Undo</button>
            <button onClick={handleExportPNG}>Export Image PNG</button>
            <ExportBoardAsPDF board={tictactoeState.tictactoe.board} winner={tictactoeState.tictactoe.winner} lineWinner={CTictactoe.getWinningCells()} />

        </div>
    );
};

export default TictactoeGame;
