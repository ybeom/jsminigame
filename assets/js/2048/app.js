import { render } from "./components";
import { initialState, startGame, setIsCard, createNewCard } from "./state";

const App = () => {
    let state = { ...initialState };
    function changeState(callback) {
        state = callback(state);
    }

    function onClickStart() {
        changeState((state) => startGame(state));
        createCard();
        createCard();
        render(state, onClickStart);
    }

    function createCard() {
        let card = [Math.floor(Math.random() * 4 + 1), Math.floor(Math.random() * 4 + 1)];
        let value = 2;
        Object.keys(state.cardValueObj).forEach((c) => {
            if (c === `r${card[0]}-c${card[1]}`) {
                return createCard();
            }
        });
        changeState((state) => createNewCard(state, card, value));
    }

    render(state, onClickStart);
    changeState((state) => setIsCard(state));
};

export default App;
