import { initialState, initializeState, startGame, checkGameStatus, setMapLoading, setTarget, decreaseTime, snakeMove, changeDirection } from "./state";
import { render } from "./components";
import { isGameEnded } from "./util";
const App = () => {
    let state = { ...initialState };

    function changeState(callback) {
        state = callback(state);
        render(state, onClickStart, onChangeDirection);
    }

    function onClickStart() {
        if (state.target.length != 2) {
            createTarget();
        }
        changeState((state) => startGame(state));
        const intervalId = setInterval(() => {
            if (isGameEnded(state.gameStatus)) {
                clearInterval(intervalId);
                return;
            }
            changeState((state) => checkGameStatus(decreaseTime(state)));
            changeState((state) => snakeMove(state));
            console.log(state);
        }, state.speed);
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
    }

    render(state, onClickStart, onChangeDirection);
    changeState((state) => setMapLoading(state, false));
};

export default App;
