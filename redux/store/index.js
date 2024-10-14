import { configureStore, applyMiddleware, combineReducers, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';


export default function configure(initialState) {
    // return null;
      let middlewares = [thunk];


  const devTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  const composeEnhancers = devTool ? devTool({ name: 'NatureCounter Redux Store' }) : compose;
  
  middlewares.push(createLogger({ collapsed: true }));

	//return configureStore({reducer: rootReducer},initialState, composeWithDevTools(applyMiddleware( ...middlewares)));
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["actionWithFilePayload"],
          ignoredPaths: ["stateWithFile"],
        },
      }),
    preloadedState: initialState,
    }
  );
  //     return configureAppStore(initialState);

// return createStore(reducer, composeWithDevTools(applyMiddleware( ...middlewares)));
}