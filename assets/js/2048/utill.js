export const GameStatus = {
    READY: "READY",
    START: "START",
    GAMEOVER: "GAMEOVER",
};

export const cardMoveDirection = {
    RIGHT: "RIGHT",
    LEFT: "LEFT",
    UP: "UP",
    DOWN: "DOWN",
    DEFAULT: "",
};
export function isGameEnded(cardValueArr) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (cardValueArr[i][j] === 0) {
                return false;
            }
            //up right down left
            let temp = [i - 1 >= 0 ? [i - 1, j] : false, j + 1 <= 3 ? [i, j + 1] : false, i + 1 <= 3 ? [i + 1, j] : false, j - 1 >= 0 ? [i, j - 1] : false];
            for (let k = 0; k < 4; k++) {
                if (temp[k] === false) {
                    continue;
                } else {
                    if (cardValueArr[i][j] === cardValueArr[temp[k][0]][temp[k][1]]) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}
export function mergeCard(cardValueArr, direction) {
    switch (direction) {
        case cardMoveDirection.UP: {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (cardValueArr[j][i] != 0) {
                        let temp = j - 1;
                        if (temp < 0) {
                            cardValueArr[j][i] = cardValueArr[j][i];
                        }
                        while (temp >= 0) {
                            if (cardValueArr[temp][i] === 0) {
                                cardValueArr[temp][i] = cardValueArr[temp + 1][i];
                                cardValueArr[temp + 1][i] = 0;
                                temp--;
                            } else if (cardValueArr[temp][i] === cardValueArr[temp + 1][i]) {
                                cardValueArr[temp][i] = cardValueArr[temp + 1][i] * 2;
                                cardValueArr[temp + 1][i] = 0;
                                break;
                            } else if (cardValueArr[temp][i] != cardValueArr[temp + 1][i]) {
                                break;
                            }
                        }
                    }
                }
            }
            return cardValueArr;
        }
        case cardMoveDirection.DOWN: {
            for (let i = 3; i >= 0; i--) {
                for (let j = 3; j >= 0; j--) {
                    if (cardValueArr[j][i] != 0) {
                        let temp = j + 1;
                        if (temp > 3) {
                            cardValueArr[j][i] = cardValueArr[j][i];
                        }
                        while (temp <= 3) {
                            if (cardValueArr[temp][i] === 0) {
                                cardValueArr[temp][i] = cardValueArr[temp - 1][i];
                                cardValueArr[temp - 1][i] = 0;
                                temp++;
                            } else if (cardValueArr[temp][i] === cardValueArr[temp - 1][i]) {
                                cardValueArr[temp][i] = cardValueArr[temp - 1][i] * 2;
                                cardValueArr[temp - 1][i] = 0;
                                break;
                            } else if (cardValueArr[temp][i] != cardValueArr[temp - 1][i]) {
                                break;
                            }
                        }
                    }
                }
            }
            return cardValueArr;
        }
        case cardMoveDirection.RIGHT: {
            for (let i = 3; i >= 0; i--) {
                for (let j = 3; j >= 0; j--) {
                    if (cardValueArr[i][j] != 0) {
                        let temp = j + 1;
                        if (temp > 3) {
                            cardValueArr[j][i] = cardValueArr[j][i];
                        }
                        while (temp <= 3) {
                            if (cardValueArr[i][temp] === 0) {
                                cardValueArr[i][temp] = cardValueArr[i][temp - 1];
                                cardValueArr[i][temp - 1] = 0;
                                temp++;
                            } else if (cardValueArr[i][temp] === cardValueArr[i][temp - 1]) {
                                cardValueArr[i][temp] = cardValueArr[i][temp - 1] * 2;
                                cardValueArr[i][temp - 1] = 0;
                                break;
                            } else if (cardValueArr[i][temp] != cardValueArr[i][temp - 1]) {
                                break;
                            }
                        }
                    }
                }
            }
            return cardValueArr;
        }
        case cardMoveDirection.LEFT: {
            for (let i = 0; i <= 3; i++) {
                for (let j = 0; j <= 3; j++) {
                    if (cardValueArr[i][j] != 0) {
                        let temp = j - 1;
                        if (temp < 0) {
                            cardValueArr[j][i] = cardValueArr[j][i];
                        }
                        while (temp >= 0) {
                            if (cardValueArr[i][temp] === 0) {
                                cardValueArr[i][temp] = cardValueArr[i][temp + 1];
                                cardValueArr[i][temp + 1] = 0;
                                temp--;
                            } else if (cardValueArr[i][temp] === cardValueArr[i][temp + 1]) {
                                cardValueArr[i][temp] = cardValueArr[i][temp + 1] * 2;
                                cardValueArr[i][temp + 1] = 0;
                                break;
                            } else if (cardValueArr[i][temp] != cardValueArr[i][temp + 1]) {
                                break;
                            }
                        }
                    }
                }
            }
            return cardValueArr;
        }
    }
}
