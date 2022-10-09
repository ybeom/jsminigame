import { GameStatus } from "./util";
import { gameMapSetting } from "./components";

export const initialState = {
    //mapLoading: 초기 그리드 div EL세팅 여부 확인
    gameStatus: GameStatus.READY,
    mapLoading: true,
    isHit: false,

    snakeArr: [15, 15],
    currentTail: 1,

    level: 1,
    timer: 10,
    missionTail: 20,
    speed: 1000,
};

export function startGame(state) {
    return { ...state, gameStatus: GameStatus.START };
}

export function checkGameStatus(state) {
    if (state.isHit) {
        return { ...state, gameStatus: GameStatus.FAIL };
    } else if (state.timer === 0 || state.currentTail === state.missionTail) {
        return { ...state, gameStatus: GameStatus.COMPLETE };
    }

    return state;
}

export function initializeState(state) {}
