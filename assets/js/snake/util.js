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

export function isTarget(head, target) {
    return head[0] === target[0] && head[1] === target[1];
}

export function hitWall([row, column]) {
    return row < 0 || row > 30 || column < 0 || column > 30;
}

export function timeOver(time) {
    return time === 0;
}

export function hitSnake(snakeArr) {
    let newSnakeArr = [...snakeArr];
    let [headRow, headColumn] = newSnakeArr[newSnakeArr.length - 1];
    newSnakeArr.pop();
    return newSnakeArr.reduce((flag, [partRow, partColumn]) => {
        return flag || (headRow === partRow && headColumn === partColumn);
    }, false);
}

export function missionComplete(state) {
    return state.missionTail === state.snakeArr.length;
}

export function nextSnakeNode([row, column], direction) {
    switch (direction) {
        case "RIGHT": {
            return [row, column + 1];
        }
        case "LEFT": {
            return [row, column - 1];
        }
        case "UP": {
            return [row - 1, column];
        }
        case "DOWN": {
            return [row + 1, column];
        }
    }
}
