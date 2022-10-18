import { GameStatus, cardMoveDirection } from "./utill";

export const initialState = {
    isCard: false,
    cardValueArr: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    gameStatus: GameStatus.READY,
    direction: cardMoveDirection.DEFAULT,
    isMoved: false,

    maxNumber: 0,
    score: 0,
};
export function initializeState() {
    return {
        isCard: true,
        cardValueArr: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        gameStatus: GameStatus.READY,
        direction: cardMoveDirection.DEFAULT,
        isMoved: false,

        maxNumber: 0,
        score: 0,
    };
}
export function startGame(state) {
    return { ...state, gameStatus: GameStatus.START };
}
export function gameOver(state) {
    return { ...state, gameStatus: GameStatus.GAMEOVER };
}

export function setIsCard(state) {
    return { ...state, isCard: true };
}

export function updateMaxNumber(state) {
    let newMaxNumber = state.cardValueArr.flat().reduce((max, n) => {
        return max >= n ? max : n;
    }, 0);
    return { ...state, maxNumber: newMaxNumber };
}
export function updateScore(state) {
    let newScore = state.cardValueArr.flat().reduce((sum, n) => {
        return (sum += n);
    }, 0);
    return { ...state, score: newScore };
}

export function createNewCard(state, [row, column], value) {
    let newCardValueArr = [...state.cardValueArr];
    newCardValueArr[row][column] = value;
    return {
        ...state,
        cardValueArr: newCardValueArr,
    };
}

export function changeCardValueArr(state, newCardValueArr) {
    return {
        ...state,
        cardValueArr: newCardValueArr,
        isMoved: false,
    };
}

export function changeDirection(state, direction) {
    if (direction === "UP") {
        return { ...state, direction: cardMoveDirection.UP, isMoved: true };
    } else if (direction === "DOWN") {
        return { ...state, direction: cardMoveDirection.DOWN, isMoved: true };
    } else if (direction === "RIGHT") {
        return { ...state, direction: cardMoveDirection.RIGHT, isMoved: true };
    } else if (direction === "LEFT") {
        return { ...state, direction: cardMoveDirection.LEFT, isMoved: true };
    }
    return state;
}
