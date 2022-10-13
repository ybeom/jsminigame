import { createEl, findElByQuery } from "./dom";

export const gameMapLayout = (onTarget, target, snakeArr, score, gameStatus, mapLoading, onClickStart) => {
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
    const gameMapEl = document.querySelectorAll(".game-display > div");

    if (gameStatus === "START") {
        startBtnEl.style.display = "none";
        gameMapEl.forEach((el) => el.classList.remove("snake"));

        snakeArr.map(([row, column]) => {
            const snakePart = findElByQuery(`.r${row}-c${column}`);
            snakePart.classList.add("snake");
        });

        const targetNode = findElByQuery(`.r${target[0]}-c${target[1]}`);
        if (onTarget) {
            targetNode.classList.remove("target");
        } else {
            targetNode.classList.add("target");
        }
    } else if (gameStatus === "FAIL") {
        startBtnEl.style.display = "inline-block";
        startBtnEl.textContent = "RESTART";
        gameMapEl.forEach((el) => el.classList.remove("target"));
        alert(`실패! 다시 시작하세요.\n최종 점수: ${score}`);
    } else if (gameStatus === "COMPLETE") {
        startBtnEl.style.display = "inline-block";
        startBtnEl.textContent = "NEXT LEVEL";
        gameMapEl.forEach((el) => el.classList.remove("target"));
        alert(`성공! 다음 단계를 시작하세요.\n현재 점수: ${score}`);
    }
};

export const gameInfoBox = (level, time, mission, tail, score) => {
    const levelEl = findElByQuery("#level");
    levelEl.textContent = level;
    const timeEl = findElByQuery("#time");
    timeEl.textContent = time;
    const missionEl = findElByQuery("#mission");
    missionEl.textContent = mission;
    const tailEl = findElByQuery("#tail");
    tailEl.textContent = tail.length;
    const scoreEl = findElByQuery("#score");
    scoreEl.textContent = score;
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
    gameMapLayout(state.onTarget, state.target, state.snakeArr, state.score, state.gameStatus, state.mapLoading, onClickStart);
    gameInfoBox(state.level, state.time, state.missionTail, state.snakeArr, state.score);
    controllerBox(state.direction, onChangeDirection);
}
