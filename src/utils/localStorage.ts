import { ITictactoeState, initialTictactoeState } from "../types/types";

const storageTictactoeKey = 'anAppTictactoe';

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const saveTictactoeState: (tictactoeState: ITictactoeState) => void = (tictactoeState: ITictactoeState) => {
    localStorage.setItem(storageTictactoeKey, JSON.stringify(tictactoeState));
};

const loadTictactoeState: () => ITictactoeState = (): ITictactoeState => {
    const tictactoeState = localStorage.getItem(storageTictactoeKey);
    if (tictactoeState) {
        return JSON.parse(tictactoeState);
    }

    return initialTictactoeState;
};

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const storage = {
    saveTictactoeState, loadTictactoeState
};

export default storage;
