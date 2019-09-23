import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {ViewChangeReducer, ViewDataReducer} from "./Redux/Reducers";
import thunk from "redux-thunk";
import './Components/ThreejsScene'
import ThreeJSScene from './Components/ThreejsScene'

const App: React.FC = () => {
    const reducers = combineReducers({view:ViewChangeReducer, viewData:ViewDataReducer});
    const store = createStore(reducers, applyMiddleware(thunk));
  return (
      <Provider store={store}>
        <div className="App">
          <ThreeJSScene/>
        </div>
      </Provider>
  );
};

export default App;
