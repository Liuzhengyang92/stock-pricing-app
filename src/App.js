import React from "react";
import Log from "./components/Log";
import Summary from "./components/Summary";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./redux/reducers";

const store = createStore(reducers);

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Log></Log>
        <Summary></Summary>
      </div>
    </Provider>
  );
};

export default App;
