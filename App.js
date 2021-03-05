import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './src/components/reducer';
import RootNavigation from "./src/navigation";



const store = createStore(reducers, {}, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigation />  
      </Provider>
    );
  }
}