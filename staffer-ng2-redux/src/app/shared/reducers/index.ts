import * as Redux from 'redux';
const {combineReducers} = Redux;

import { AppState } from './app.state';
import staffer from './staffer';

export const rootReducer = combineReducers<AppState>({
    staffer
});

export { AppState, initialState } from './app.state';
