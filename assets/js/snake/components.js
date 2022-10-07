import { createEl, findElByQuery } from "./dom";

export const gameMapLayout = (mapLoading) => {
    const gameDisplay = findElByQuery(".game-display");
    if (!mapLoading) {
        for (let i = 0; i < 31; i++) {
            for (let j = 0; j < 31; j++) {
                const pixel = createEl("div");
                pixel.classList.add(`r${i}-c${j}`);
                gameDisplay.appendChild(pixel);
            }
        }
    }
};

export function render(state) {}
