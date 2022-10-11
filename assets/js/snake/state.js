import { GameStatus, SnakeDirection } from "./util";
import { gameMapSetting } from "./components";

export const initialState = {
    gameStatus: GameStatus.READY,
    mapLoading: true,
    direction: SnakeDirection.RIGHT,
    onTarget: false,
    isHit: false,
    snakeArr: [[15, 15]],
    target: [],
    level: 1,
    time: 10,
    missionTail: 10,
    speed: 100,
    score: 0,
};

export function startGame(state) {
    return { ...state, gameStatus: GameStatus.START };
}
export function initializeState(state) {
    if (state.gameStatus === GameStatus.FAIL) {
        return {
            gameStatus: GameStatus.FAIL,
            mapLoading: false,
            direction: SnakeDirection.RIGHT,
            onTarget: false,
            isHit: false,
            snakeArr: [[15, 15]],
            target: [],
            level: 1,
            time: 10,
            missionTail: 5,
            speed: 100,
            score: 0,
        };
    } else if (state.gameStatus === GameStatus.COMPLETE) {
        return {
            gameStatus: GameStatus.COMPLETE,
            mapLoading: false,
            direction: SnakeDirection.RIGHT,
            onTarget: false,
            isHit: false,
            snakeArr: [[15, 15]],
            target: [],
            level: state.level + 1,
            time: state.time - 2 < 4 ? 4 : state.time - 2,
            missionTail: state.missionTail + 5,
            speed: state.speed - 25 < 25 ? 25 : state.speed - 25,
            score: state.score + 100,
        };
    }
    return state;
}

export function failGame(state) {
    return { ...state, gameStatus: GameStatus.FAIL };
}
export function completeGame(state) {
    return { ...state, gameStatus: GameStatus.COMPLETE };
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

export function snakeMove(state, head) {
    state.snakeArr.push(head);
    state.snakeArr.shift();
    return { ...state };
}

export function meetTarget(state, move) {
    state.snakeArr.push(move);
    return { ...state, time: state.time + 4, onTarget: true, score: state.score + 10 };
}

export function decreaseTime(state) {
    return { ...state, time: state.time - 1 };
}
export function decreaseMission(state) {
    return { ...state, missionTail: state.missionTail - 1 };
}
export function setTarget(state, target) {
    return { ...state, target, onTarget: false };
}

export function setMapLoading(state, mapLoading) {
    return { ...state, mapLoading };
}
