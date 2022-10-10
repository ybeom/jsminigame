import { GameStatus, SnakeDirection } from "./util";
import { gameMapSetting } from "./components";

export const initialState = {
    //mapLoading: 초기 그리드 div EL세팅 여부 확인
    gameStatus: GameStatus.READY,
    mapLoading: true,

    direction: SnakeDirection.RIGHT,
    isHit: false,

    snakeArr: [[15, 15]],
    target: [],

    level: 1,
    time: 10,
    missionTail: 20,
    speed: 1000,
};

export function startGame(state) {
    return { ...state, gameStatus: GameStatus.START };
}

export function checkGameStatus(state) {
    if (state.isHit || state.time === 0) {
        return { ...state, gameStatus: GameStatus.FAIL };
    } else if (state.currentTail === state.missionTail) {
        return { ...state, gameStatus: GameStatus.COMPLETE };
    }
    return state;
}

export function changeDirection(state, direction) {
    if (direction === "UP" && state.direction != "DOWN") {
        return { ...state, direction: SnakeDirection.UP };
    } else if (direction === "DOWN" && state.direction != "UP") {
        return { ...state, direction: SnakeDirection.DOWN };
    } else if (direction === "RIGHT" && state.direction != "LEFT") {
        return { ...state, direction: SnakeDirection.RIGHT };
    } else if (direction === "LEFT" && state.direction != "RIGHT") {
        return { ...state, direction: SnakeDirection.LEFT };
    }
    return state;
}

export function snakeMove(state) {
    switch (state.direction) {
        case "RIGHT": {
            const nextSnakeArr = state.snakeArr.map(([row, column]) => {
                return [row, column + 1];
            });
            return { ...state, snakeArr: nextSnakeArr };
        }
        case "LEFT": {
            const nextSnakeArr = state.snakeArr.map(([row, column]) => {
                return [row, column - 1];
            });
            return { ...state, snakeArr: nextSnakeArr };
        }
        case "UP": {
            const nextSnakeArr = state.snakeArr.map(([row, column]) => {
                return [row - 1, column];
            });
            return { ...state, snakeArr: nextSnakeArr };
        }
        case "DOWN": {
            const nextSnakeArr = state.snakeArr.map(([row, column]) => {
                return [row + 1, column];
            });
            return { ...state, snakeArr: nextSnakeArr };
        }
    }
}

export function decreaseTime(state) {
    return { ...state, time: state.time - 1 };
}
export function decreaseMission(state) {
    return { ...state, missionTail: state.missionTail - 1 };
}
export function setTarget(state, target) {
    return { ...state, target };
}

export function setMapLoading(state, mapLoading) {
    return { ...state, mapLoading };
}

export function initializeState(state) {}
