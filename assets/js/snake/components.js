import { createEl, findElByQuery } from "./dom";

export const gameMapLayout = (target, snakeArr, gameStatus, mapLoading, onClickStart) => {
    const gameDisplay = findElByQuery(".game-display");
    const startBtnEl = findElByQuery(".start-btn");
    startBtnEl.addEventListener("click", onClickStart);
    if (mapLoading) {
        //map EL 생성
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
        snakeArr.map(([row, column]) => {
            const snakePart = findElByQuery(`.r${row}-c${column}`);
            snakePart.classList.add("snake");
        });
        //목표 그리기
        const targetNode = findElByQuery(`.r${target[0]}-c${target[1]}`);
        targetNode.classList.add("target");
    }
};

export function render(state, gameMapLayout, onClickStart) {
    gameMapLayout(state.target, state.snakeArr, state.gameStatus, state.mapLoading, onClickStart);
}
