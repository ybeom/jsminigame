import { createEl, findElByQuery } from "./dom";

export function cardLayout(maxNumber, score, cardValueArr, gameStatus, isCard, onClickStart) {
    const startBtnEl = findElByQuery("#start-btn");
    startBtnEl.addEventListener("click", onClickStart);
    const maxEl = findElByQuery("#max");
    maxEl.textContent = maxNumber;
    const scoreEl = findElByQuery("#score");
    scoreEl.textContent = score;

    if (!isCard) {
        const gameDisplayEl = findElByQuery(".game-display");
        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j <= 4; j++) {
                let card = createEl("div");
                card.classList.add(`r${i}-c${j}`, "card");
                gameDisplayEl.appendChild(card);
            }
        }
    }
    const cardEl = document.querySelectorAll(".card");
    if (gameStatus === "START") {
        startBtnEl.style.display = "none";
        [].forEach.call(cardEl, (el) => {
            el.classList.remove(`v${el.innerHTML}`);
            el.innerHTML = "";
        });
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (cardValueArr[i][j] != 0) {
                    [].forEach.call(cardEl, (el) => {
                        if (el.classList.contains(`r${i + 1}-c${j + 1}`)) {
                            el.innerHTML = `${cardValueArr[i][j]}`;
                            el.classList.add(`v${cardValueArr[i][j]}`);
                        }
                    });
                }
            }
        }
    } else if (gameStatus === "GAMEOVER") {
        alert(`GAME OVER! 최종 점수: ${score}/(MAX: ${maxNumber})`);
        startBtnEl.style.display = "inline-block";
    }
}

export const controllerBox = (isMoved, isCard, onChangeCard) => {
    if (!isCard) {
        const arrowUpBtnEL = findElByQuery("#up-btn");
        arrowUpBtnEL.addEventListener("click", () => onChangeCard("UP"));
        const arrowDownBtnEL = findElByQuery("#down-btn");
        arrowDownBtnEL.addEventListener("click", () => onChangeCard("DOWN"));
        const arrowRightBtnEL = findElByQuery("#right-btn");
        arrowRightBtnEL.addEventListener("click", () => onChangeCard("RIGHT"));
        const arrowLeftBtnEL = findElByQuery("#left-btn");
        arrowLeftBtnEL.addEventListener("click", () => onChangeCard("LEFT"));
    }

    const keyDownEventHandler = (e) => {
        if (isMoved) return;
        if (e.keyCode === 38) {
            return onChangeCard("UP");
        } else if (e.keyCode === 40) {
            return onChangeCard("DOWN");
        } else if (e.keyCode === 37) {
            return onChangeCard("LEFT");
        } else if (e.keyCode === 39) {
            return onChangeCard("RIGHT");
        }
    };
    if (!isCard) {
        document.addEventListener("keydown", keyDownEventHandler, true);
    }
};

export function render(state, onClickStart, onChangeCard) {
    cardLayout(state.maxNumber, state.score, state.cardValueArr, state.gameStatus, state.isCard, onClickStart);
    controllerBox(state.isMoved, state.isCard, onChangeCard);
}
