import { GameStatus } from "./utill";

export const initialState = {
    isCard: false,
    cardValueObj: {},
    gameStatus: "READY",
};

export function startGame(state) {
    return { ...state, gameStatus: GameStatus.START };
}

export function setIsCard(state) {
    return { ...state, isCard: true };
}

export function createNewCard(state, [row, column], value) {
    let newCardValueObj = { ...state.cardValueObj };
    newCardValueObj[`r${row}-c${column}`] = value;
    return {
        ...state,
        cardValueObj: newCardValueObj,
    };
}
