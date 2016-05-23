import { createStore } from 'redux';

import { rootReducer, initialState } from '../reducers/index';

export const createStoreInstance = () => {
    return createStore(rootReducer, initialState);
};
