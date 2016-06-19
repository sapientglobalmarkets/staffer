import * as _ from 'lodash';

import {
    SET_FILTER_FIELD,
    SET_SELECTED_NEED_RAW,
    RECEIVE_PROJECTS,
    RECEIVE_SKILLS,
    RECEIVE_FILTERED_NEEDS,
    RECEIVE_MATCHED_PEOPLE,
    RECEIVE_ASSIGNMENT_RESPONSE
} from './constants';

// The initial state of the App
const initialState = {
    needMap: {},
    personMap: {},
    projectMap: {},
    skillMap: {},
    statusMap: {
        all: {id: 'all', name: 'All'},
        open: {id: 'open', name: 'Open'},
        closed: {id: 'closed', name: 'Closed'}
    },
    filter: {
        minStartDate: null,
        maxStartDate: null,
        projectId: -1,
        skillId: -1,
        status: 'open'
    },
    filteredNeedIds: [],
    matchedPeopleIds: [],
    selectedNeedId: null
};

function staffingReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER_FIELD: {
            // TODO: Can this be done more easily with the spread operator?
            let newFilter = Object.assign({}, state.filter);
            newFilter[action.key] = action.value;

            return Object.assign({}, state, {
                filter: newFilter
            });
        }
        case SET_SELECTED_NEED_RAW:
            return Object.assign({}, state, {
                selectedNeedId: action.selectedNeedId
            });
        case RECEIVE_PROJECTS:
            return Object.assign({}, state, {
                projectMap: action.projectMap
            });
        case RECEIVE_SKILLS:
            return Object.assign({}, state, {
                skillMap: action.skillMap
            });
        case RECEIVE_FILTERED_NEEDS: {
            // Merge response maps with state maps (make sure elements in response maps override those in state)
            let needMap = _.extend({}, state.needMap, action.needMap);
            let personMap = _.extend({}, state.personMap, action.personMap);
            let projectMap = _.extend({}, state.projectMap, action.projectMap);
            let skillMap = _.extend({}, state.skillMap, action.skillMap);

            let filteredNeedIds = _.chain(action.needMap)
                .values()
                .sortBy('startDate')
                .map(need => need.id)
                .value();

            return Object.assign({}, state, {
                needMap: needMap,
                projectMap: projectMap,
                personMap: personMap,
                skillMap: skillMap,
                filteredNeedIds: filteredNeedIds
            });
        }
        case RECEIVE_MATCHED_PEOPLE: {
            // Merge response maps with state maps (make sure elements in response maps override those in state)
            let personMap = _.extend({}, state.personMap, action.personMap);

            let matchedPeopleIds = _.chain(action.personMap)
                .values()
                .sortBy('name')
                .map((person) => person.id)
                .value();

            return Object.assign({}, state, {
                personMap: personMap,
                matchedPeopleIds: matchedPeopleIds
            });
        }
        case RECEIVE_ASSIGNMENT_RESPONSE: {
            // Merge response maps with state maps (make sure elements in response maps override those in state)
            let needMap = _.extend({}, state.needMap, action.needMap);
            let personMap = _.extend({}, state.personMap, action.personMap);

            return Object.assign({}, state, {
                needMap: needMap,
                personMap: personMap
            });
        }
        default:
            return state;
    }
}

export default staffingReducer;
