export const GameStatus = {
    READY: "READY",
    START: "START",
    FAIL: "FAIL",
    COMPLETE: "COMPLETE",
};

export const SnakeDirection = {
    RIGHT: "RIGHT",
    LEFT: "LEFT",
    UP: "UP",
    DOWN: "DOWN",
};

export function isGameEnded(gameStatus) {
    return gameStatus !== GameStatus.START;
}
