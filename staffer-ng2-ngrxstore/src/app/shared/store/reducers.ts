import { AppState } from "./state";
import * as _ from 'lodash';
import { Need } from "../models/index";

export function reducer(state:AppState, { type, payload }) {
    switch (type) {
        case 'LOAD_PROJECTS':
            return Object.assign({}, state, {
                projects: _.sortBy(_.values(payload), 'name')
            });

        case 'LOAD_SKILLS':
            let skills = _.sortBy(_.values(payload), 'name');
            return Object.assign({}, state, { skills });

        case 'CHANGE_FILTER':
            return Object.assign({}, state, { filter: payload });

        case 'LOAD_NEEDS':
            let matchingNeeds = _.sortBy(_.values(payload.needMap), 'startDate') as Need[];

            return Object.assign({}, state, {
                matchingNeeds,
                cache: {
                    projects: payload.projectMap,
                    skills: payload.skillMap,
                    people: payload.personMap
                }
            });

        default:
            return state;
    }
}

