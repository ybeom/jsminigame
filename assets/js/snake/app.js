import { initialState, initializeState, startGame, checkGameStatus, setMapLoading, setTarget, decreaseTime, snakeMove, changeDirection } from "./state";
import { render } from "./components";
import { isGameEnded } from "./util";
const App = () => {
    let state = { ...initialState };

    function changeState(callback) {
        state = callback(state);
    }

    function onClickStart() {
        if (state.target.length != 2) {
            createTarget();
        }
        changeState((state) => startGame(state));
        const intervalGameId = setInterval(() => {
            if (isGameEnded(state.gameStatus)) {
                clearInterval(intervalGameId);
                return;
            }
            changeState((state) => snakeMove(state));
            render(state, onClickStart, onChangeDirection);
        }, state.speed);
        const intervalTimerId = setInterval(() => {
            changeState((state) => checkGameStatus(decreaseTime(state)));
            render(state, onClickStart, onChangeDirection);
        }, 1000);
        render(state, onClickStart, onChangeDirection);
    }

    function onChangeDirection(direction) {
        changeState((state) => changeDirection(state, direction));
    }

    function createTarget() {
        let target = [Math.floor(Math.random() * 29 + 1), Math.floor(Math.random() * 29 + 1)];
        state.snakeArr.map((node) => {
            if (node === target) {
                createTarget();
            }
        });
        changeState((state) => setTarget(state, target));
        render(state, onClickStart, onChangeDirection);
    }

    render(state, onClickStart, onChangeDirection);
    changeState((state) => setMapLoading(state, false));
};

export default App;
