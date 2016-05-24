import { createStore } from 'redux';

import { reducer, initialState } from './reducer';

export const createStoreInstance = () => {
    return createStore(reducer, initialState);
};
