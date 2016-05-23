import { AppState, initialState } from './app.state';
import { RECEIVE_NEEDS } from '../actions/staffer.actions';

export default (state: AppState = initialState, action: any) => {

    console.log('reducer - action:', action);

    let nextState: AppState = null;
    switch (action.type) {
        case RECEIVE_NEEDS:
            nextState = Object.assign({}, state, {
                response: action.response
            });
            break;

        default:
            nextState = state;
            break;
    }

    return nextState;
}
