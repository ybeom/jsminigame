import { createEl, findElByQuery } from "./dom";

export function cardLayout(cardValueObj, gameStatus, isCard, onClickStart) {
    const startBtnEl = findElByQuery("#start-btn");
    startBtnEl.addEventListener("click", onClickStart);
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
        if (Object.keys(cardValueObj).length > 0) {
            Object.keys(cardValueObj).forEach((c) => {
                [].forEach.call(cardEl, (el) => {
                    if (el.classList.contains(c)) {
                        el.innerHTML = `${cardValueObj[c]}`;
                        el.classList.add(`v${cardValueObj[c]}`);
                    }
                });
            });
        }
    }
}

export function render(state, onClickStart) {
    cardLayout(state.cardValueObj, state.gameStatus, state.isCard, onClickStart);
}
