import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducer';

const devtools = window.devToolsExtension || (() => noop => noop);

export default function configureStore(initialState = {}) {
    // Create the store with thunk middleware
    const middlewares = [thunk];

    const enhancers = [
        applyMiddleware(...middlewares),
        devtools()
    ];

    const store = createStore(
        createReducer(),
        initialState,
        compose(...enhancers)
    );

    // Initialize it with no other reducers
    store.asyncReducers = {};
    return store;
}
