import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tictactoeReducer from "./slices/tictactoeSlice";

const rootReducer = combineReducers({
    tictactoe: tictactoeReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']