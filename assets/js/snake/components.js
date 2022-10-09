import { createEl, findElByQuery } from "./dom";

export const gameMapLayout = (snakeArr, mapLoading, onClickStart) => {
    const gameDisplay = findElByQuery(".game-display");
    const startBtnEl = findElByQuery(".start-btn");
    startBtnEl.addEventListener("click", onClickStart);
    console.log("add addeventlistener");
    if (mapLoading) {
        //map EL 생성
        for (let i = 0; i < 31; i++) {
            for (let j = 0; j < 31; j++) {
                const pixel = createEl("div");
                pixel.classList.add(`r${i}-c${j}`);
                gameDisplay.appendChild(pixel);
            }
        }
        // //뱀 그리기
        // snakeArr.push([15, 15]);
        // const startSnake = findElByQuery(`.r15-c15`);
        // startSnake.classList.add(".snake");
        // //먹이 그리기
        // const feedPosition = [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)];
        // if(feddPosition === [15,15]){

        // }
    }
};

export function render(state, gameMapLayout) {
    gameMapLayout(state.mapLoading);
}
