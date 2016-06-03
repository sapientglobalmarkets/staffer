import { FilterState } from "../models/index";
import { combineReducers } from "@ngrx/store";

function filterStateReducer(state = new FilterState(), {type, payload}) {
    switch (type) {
        case 'CHANGE_FILTER':
            return Object.assign({}, state, payload);

        default:
            return state;
    }

}

export const reducer = combineReducers({
    filter: filterStateReducer
});
