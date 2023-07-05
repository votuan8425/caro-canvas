import { Font, Document, Page, View, Text, BlobProvider } from '@react-pdf/renderer';

const ExportBoardAsPDF = ({ board, winner, lineWinner }: { board: number[][], winner: number, lineWinner: number[][] }) => {
    Font.register({
        family: 'Arial',
        src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
    });

    const renderPDF = () => (
        <Document>
            <Page>
                <View>
                    {board.map((row, rowIndex) => (
                        <View key={rowIndex} style={{ flexDirection: 'row' }}>
                            {row.map((cell, cellIndex) => (
                                <View
                                    key={cellIndex}
                                    style={{
                                        width: 5,
                                        height: 5,
                                        border: '1px solid black',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '3px 18px 20px 10px',
                                        backgroundColor: isCellInLineWinner(lineWinner, rowIndex, cellIndex) ? 'yellow' : 'transparent',
                                    }}
                                >
                                    <Text style={{ fontFamily: 'Arial', fontSize: '14px', color: `${cell === 1 ? 'red' : 'blue'}`, fontWeight: 700 }}>
                                        {cell === 1 ? 'X' : cell === 2 ? 'O' : ''}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ))}
                    <View>
                        <Text style={{ marginTop: '10px' }}>
                            {winner !== 0 && (
                                <>
                                    Player
                                    <Text
                                        style={{
                                            color: `${winner === 1 ? 'red' : 'blue'}`,
                                            margin: '0 2px',
                                        }}
                                    >
                                        {winner === 1 && ' X '}
                                        {winner === 2 && ' O '}
                                    </Text>
                                    is the winner
                                </>
                            )}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    );

    const handleBlob = (blob: Blob | null) => {
        if (blob !== null) {
            const pdfUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'game_board.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const isCellInLineWinner = (lineWinner: number[][], rowIndex: number, cellIndex: number) => {
        return lineWinner.some(([row, col]) => row === rowIndex && col === cellIndex);
    };

    return (
        <BlobProvider document={renderPDF()}>
            {({ blob }) => (
                <button onClick={() => handleBlob(blob)}>Export as PDF</button>
            )}
        </BlobProvider>
    );
};

export default ExportBoardAsPDF;
