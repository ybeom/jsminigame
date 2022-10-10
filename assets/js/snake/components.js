import { createEl, findElByQuery } from "./dom";

export const gameMapLayout = (target, snakeArr, gameStatus, mapLoading, onClickStart) => {
    const gameDisplay = findElByQuery(".game-display");
    const startBtnEl = findElByQuery(".start-btn");
    startBtnEl.addEventListener("click", onClickStart);
    if (mapLoading) {
        for (let i = 1; i < 31; i++) {
            for (let j = 1; j < 31; j++) {
                const pixel = createEl("div");
                pixel.classList.add(`r${i}-c${j}`);
                gameDisplay.appendChild(pixel);
            }
        }
    }
    if (gameStatus === "START") {
        startBtnEl.style.display = "none";
        const gameMapEl = document.querySelectorAll(".game-display > div");
        gameMapEl.forEach((el) => el.classList.remove("snake"));
        snakeArr.map(([row, column]) => {
            const snakePart = findElByQuery(`.r${row}-c${column}`);
            snakePart.classList.add("snake");
        });
        const targetNode = findElByQuery(`.r${target[0]}-c${target[1]}`);
        targetNode.classList.add("target");
    }
};

export const gameInfoBox = (level, time, mission, tail) => {
    const levelEl = findElByQuery("#level");
    levelEl.textContent = level;
    const timeEl = findElByQuery("#time");
    timeEl.textContent = time;
    const missionEl = findElByQuery("#mission");
    missionEl.textContent = mission;
    const tailEl = findElByQuery("#tail");
    tailEl.textContent = tail.length;
};

export const controllerBox = (direction, onChangeDirection) => {
    const arrowUpBtnEL = findElByQuery("#up-btn");
    arrowUpBtnEL.addEventListener("click", () => onChangeDirection("UP"));
    const arrowDownBtnEL = findElByQuery("#down-btn");
    arrowDownBtnEL.addEventListener("click", () => onChangeDirection("DOWN"));
    const arrowRightBtnEL = findElByQuery("#right-btn");
    arrowRightBtnEL.addEventListener("click", () => onChangeDirection("RIGHT"));
    const arrowLeftBtnEL = findElByQuery("#left-btn");
    arrowLeftBtnEL.addEventListener("click", () => onChangeDirection("LEFT"));

    const keyDownEventHandler = (e) => {
        if (e.keyCode === 38) {
            return onChangeDirection("UP");
        } else if (e.keyCode === 40) {
            return onChangeDirection("DOWN");
        } else if (e.keyCode === 37) {
            return onChangeDirection("LEFT");
        } else if (e.keyCode === 39) {
            return onChangeDirection("RIGHT");
        }
    };
    document.addEventListener("keydown", keyDownEventHandler);
};

export function render(state, onClickStart, onChangeDirection) {
    gameMapLayout(state.target, state.snakeArr, state.gameStatus, state.mapLoading, onClickStart);
    gameInfoBox(state.level, state.time, state.missionTail, state.snakeArr);
    controllerBox(state.direction, onChangeDirection);
}
