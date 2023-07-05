export const exportBoardAsPNG = (canvas: HTMLCanvasElement) => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'board.png';
    link.click();
};

