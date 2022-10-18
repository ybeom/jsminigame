import { render } from "./components";
import { initialState, startGame, setIsCard, createNewCard, changeDirection, changeCardValueArr, gameOver, updateMaxNumber, updateScore, initializeState } from "./state";
import { mergeCard, isGameEnded } from "./utill";
const App = () => {
    let state = { ...initialState };
    function changeState(callback) {
        state = callback(state);
    }

    function onClickStart() {
        changeState((state) => startGame(state));
        createCard();
        createCard();
        render(state, onClickStart, onChangeCard);
    }

    function createCard() {
        let card = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
        let value = 2;
        if (state.cardValueArr[card[0]][card[1]] != 0) {
            createCard();
            return;
        }
        changeState((state) => createNewCard(state, card, value));
    }

    function onChangeCard(direction) {
        if (isGameEnded(state.cardValueArr)) {
            changeState((state) => gameOver(state));
            render(state, onClickStart, onChangeCard);
            changeState(() => initializeState());
        } else {
            onChangeDirection(direction);
            onMoveCard();
            changeState((state) => updateMaxNumber(state));
            changeState((state) => updateScore(state));
            createCard();
        }
        render(state, onClickStart, onChangeCard);
    }

    function onChangeDirection(direction) {
        changeState((state) => changeDirection(state, direction));
    }

    function onMoveCard() {
        changeState((state) => changeCardValueArr(state, mergeCard(state.cardValueArr, state.direction)));
    }

    render(state, onClickStart, onChangeCard);
    changeState((state) => setIsCard(state));
};

export default App;
