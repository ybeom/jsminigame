import { initialState, initializeState, startGame, checkGameStatus } from "./state";
import { gameMapLayout, render } from "./components";
const App = () => {
    let state = { ...initialState };

    function changeState(callback) {
        state = callback(state);
        render();
    }

    function onClickStart() {
        changeState((state) => startGame(state));
        render(state, gameMapLayout);
    }
    console.log(1);
    render(state, gameMapLayout);
    console.log(2);
};

export default App;
