import { AppState } from "./state";
import * as _ from 'lodash';
import { Need, Person } from "../models/index";

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

        case 'LOAD_MATCHING_NEEDS':
            let matchingNeeds = _.sortBy(_.values(payload.needMap), 'startDate') as Need[];

            return Object.assign({}, state, {
                matchingNeeds,
                matchingPeople: [],
                selectedNeed: null,
                cache: {
                    projects: payload.projectMap,
                    skills: payload.skillMap,
                    people: payload.personMap
                }
            });

        case 'LOAD_MATCHING_PEOPLE':
            let matchingPeople = _.sortBy(_.values(payload), 'name') as Person[];

            return Object.assign({}, state, {
                matchingPeople
            });

        case 'SET_SELECTED_NEED':
            return Object.assign({}, state, {
                selectedNeed: payload
            });

        case 'ASSIGN_PERSON':
        case 'UNASSIGN_PERSON':
            let { needId, needMap, personMap } = payload;
            let need = needMap[ needId ];

            let needIndex = _.findIndex(state.matchingNeeds, { id: needId });
            state.matchingNeeds[ needIndex ] = Object.assign({}, need);
            state.cache.people[ need.personId ] = personMap[ need.personId ];

            return Object.assign({}, state, {
                selectedNeed: need,
                matchingNeeds: state.matchingNeeds.slice()
            });


        default:
            return state;
    }
}

