import { initialState, initializeState, startGame, checkGameStatus, setMapLoading, setTarget, decreaseTime, snakeMove, changeDirection, meetTarget, failGame, completeGame } from "./state";
import { render } from "./components";
import { isGameEnded, isTarget, hitWall, timeOver, hitSnake, nextSnakeNode, missionComplete } from "./util";
const App = () => {
    let state = { ...initialState };
    function changeState(callback) {
        state = callback(state);
    }

    function onClickStart() {
        changeState((state) => startGame(initializeState(state)));
        if (state.target.length != 2) {
            createTarget();
        }
        const intervalGameId = setInterval(() => {
            // if (isGameEnded(state.gameStatus)) {
            //     clearInterval(intervalGameId);
            //     render(state, onClickStart, onChangeDirection);
            //     return;
            // }
            if (isTarget(state.snakeArr[state.snakeArr.length - 1], state.target)) {
                changeState((state) => {
                    return meetTarget(state, nextSnakeNode(state.snakeArr[state.snakeArr.length - 1], state.direction));
                });

                render(state, onClickStart, onChangeDirection);
                createTarget();
            } else {
                changeState((state) => snakeMove(state, nextSnakeNode(state.snakeArr[state.snakeArr.length - 1], state.direction)));
            }
            if (hitWall(state.snakeArr[state.snakeArr.length - 1]) || timeOver(state.time) || hitSnake(state.snakeArr)) {
                changeState((state) => failGame(state));
                clearInterval(intervalGameId);
                render(state, onClickStart, onChangeDirection);
                return;
            } else if (missionComplete(state)) {
                changeState((state) => completeGame(state));
                clearInterval(intervalGameId);
                render(state, onClickStart, onChangeDirection);
                return;
            }
            render(state, onClickStart, onChangeDirection);
        }, state.speed);

        const intervalTimerId = setInterval(() => {
            if (isGameEnded(state.gameStatus)) {
                clearInterval(intervalTimerId);
                return;
            }
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
