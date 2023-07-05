import React, { useEffect } from 'react';
import TictactoeGame from './components/TictactoeGame';
import { Provider } from 'react-redux';
import { setupStore } from './redux/store';

const App: React.FC = (): React.ReactElement => {

  const store = setupStore();
  return (
    // <PDFViewer>
    <Provider store={store}>
      <TictactoeGame />
    </Provider>
    // </PDFViewer>
  );
}

export default App;
