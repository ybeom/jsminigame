import { initialState, initializeState } from "./state";
import { render } from "./components";
const App = () => {
    let state = { ...initialState };

    function changeStaet(callback) {
        state = callback(state);
        render();
    }

    function onClickStart() {
        if (!state.mapLoading) {
        }
    }
};

export default App;
