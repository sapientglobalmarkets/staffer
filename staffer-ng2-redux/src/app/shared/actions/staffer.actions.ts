import * as Redux from 'redux';

/* ----- Action Types & Action Creators ----- */

export const RECEIVE_NEEDS: string = 'RECEIVE_NEEDS';
export var createActionReceiveNeeds = (response) => {
    return <Redux.Action>{
        type: RECEIVE_NEEDS,
        response: response
    };
};
