import { initialState, initializeState, startGame, checkGameStatus, setMapLoading, setTarget } from "./state";
import { gameMapLayout, render } from "./components";
const App = () => {
    let state = { ...initialState };

    function changeState(callback) {
        state = callback(state);
        render(state, gameMapLayout, onClickStart);
    }

    function onClickStart() {
        if (state.target.length != 2) {
            createTarget();
            console.log(state.target);
        }
        changeState((state) => startGame(state));

        render(state, gameMapLayout, onClickStart);
    }

    function createTarget() {
        let target = [Math.floor(Math.random() * 29 + 1), Math.floor(Math.random() * 29 + 1)];
        state.snakeArr.map((node) => {
            if (node === target) {
                createTarget();
            }
        });
        changeState((state) => setTarget(state, target));
    }

    render(state, gameMapLayout, onClickStart);
    changeState((state) => setMapLoading(state, false));
};

export default App;
