import { combineReducers } from 'redux';
import { staffingReducer } from '../staffing';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
    return combineReducers({
        staffing: staffingReducer,
        ...asyncReducers
    });
}
