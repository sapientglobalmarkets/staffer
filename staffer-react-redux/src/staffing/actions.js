import 'whatwg-fetch';
import * as _ from 'lodash';

import UrlSearchParams from 'url-search-params';

import {
    SET_FILTER_FIELD,
    SET_SELECTED_NEED_RAW,
    RECEIVE_PROJECTS,
    RECEIVE_SKILLS,
    RECEIVE_FILTERED_NEEDS,
    RECEIVE_MATCHED_PEOPLE,
    RECEIVE_ASSIGNMENT_RESPONSE
} from './constants';

const HOST = 'http://localhost:8080';
const NEEDS_URL = `${HOST}/needs`;
const PEOPLE_URL = `${HOST}/people`;
const PROJECTS_URL = `${HOST}/projects`;
const SKILLS_URL = `${HOST}/skills`;

export function setFilterField(key, value) {
    return {
        type: SET_FILTER_FIELD,
        key: key,
        value: value
    };
}

export function receiveProjects(projectMap) {
    return {
        type: RECEIVE_PROJECTS,
        projectMap
    };
}

export function receiveSkills(skillMap) {
    return {
        type: RECEIVE_SKILLS,
        skillMap
    };
}

export function receiveFilteredNeeds(needMap, projectMap, personMap, skillMap) {
    return {
        type: RECEIVE_FILTERED_NEEDS,
        needMap,
        projectMap,
        personMap,
        skillMap
    };
}

export function receiveMatchedPeople(personMap) {
    return {
        type: RECEIVE_MATCHED_PEOPLE,
        personMap
    };
}

export function receiveAssignmentResponse(needMap, personMap) {
    return {
        type: RECEIVE_ASSIGNMENT_RESPONSE,
        needMap,
        personMap
    };
}

export function fetchProjects() {
    return dispatch => {
        return fetch(PROJECTS_URL)
            .then(response => response.json())
            .then(projectMap => dispatch(receiveProjects(projectMap)))
            .catch(function(e) {
                console.log('Failed to fetch projects:', e.message); // eslint-disable-line no-console
            });
    };
}

export function fetchSkills() {
    return dispatch => {
        return fetch(SKILLS_URL)
            .then(response => response.json())
            .then(skillMap => dispatch(receiveSkills(skillMap)))
            .catch(function(e) {
                console.log('Failed to fetch skills:', e.message); // eslint-disable-line no-console
            });
    };
}

export function fetchNeeds() {
    return (dispatch, getState) => {

        const {minStartDate, maxStartDate, projectId, skillId, status} = getState().staffing.filter;

        let params = new UrlSearchParams();
        setIfValue('projectId', projectId, params);
        setIfValue('skillId', skillId, params);
        setIfValue('minStartDate', minStartDate, params);
        setIfValue('maxStartDate', maxStartDate, params);
        setIfValue('status', status, params);

        return fetch(`${NEEDS_URL}?${params}`)
            .then(response => response.json())
            .then(({needMap, projectMap, personMap, skillMap}) => {
                _.each(needMap, need => parseNeed(need));
                dispatch(receiveFilteredNeeds(needMap, projectMap, personMap, skillMap));
                let filteredNeedIds = getState().staffing.filteredNeedIds;
                let selectedNeedId = (filteredNeedIds.length > 0) ? filteredNeedIds[0] : null;
                return dispatch(setSelectedNeed(selectedNeedId));
            })
            .catch(function(e) {
                console.log('Failed to fetch needs:', e.message); // eslint-disable-line no-console
            });
    };
}

export function setSelectedNeed(selectedNeedId) {
    return (dispatch, getState) => {

        dispatch(setSelectedNeedRaw(selectedNeedId));

        let needMap = getState().staffing.needMap;
        if (!selectedNeedId || !needMap[selectedNeedId]) {
            return dispatch(receiveMatchedPeople({}));
        }

        const {id, skillId, startDate, endDate} = needMap[selectedNeedId];

        let params = new URLSearchParams();
        params.set('needId', id.toString());
        params.set('skillId', skillId.toString());
        params.set('availableFrom', startDate.toISOString());
        params.set('availableTo', endDate.toISOString());

        return fetch(`${PEOPLE_URL}?${params}`)
            .then(response => response.json())
            .then(personMap =>
                dispatch(receiveMatchedPeople(personMap)))
            .catch(function(e) {
                console.log('Failed to fetch people:', e.message); // eslint-disable-line no-console
            });
    };
}

// Internal action - should not be called from outside
function setSelectedNeedRaw(selectedNeedId) {
    return {
        type: SET_SELECTED_NEED_RAW,
        selectedNeedId: selectedNeedId
    };
}

export function changeAssignment(personId, needId, isAssigned) {
    return (dispatch) => {

        if (isAssigned) {
            // Assign the person to the selected need
            fetch(`${PEOPLE_URL}/${personId}/needs/${needId}`, {method: 'post'})
                .then(response => response.json())
                .then(({needMap, personMap}) => {
                    _.each(needMap, need => parseNeed(need));
                    return dispatch(receiveAssignmentResponse(needMap, personMap));
                });
        }
        else {
            // Unassign the person from the selected need
            fetch(`${PEOPLE_URL}/${personId}/needs/${needId}`, {method: 'delete'})
                .then(response => response.json())
                .then(({needMap, personMap}) => {
                    _.each(needMap, need => parseNeed(need));
                    return dispatch(receiveAssignmentResponse(needMap, personMap));
                });
        }
    };
}

function setIfValue(key, value, params) {
    if (!value || value === -1) {
        return;
    }

    if (value instanceof Date) {
        value = value.toISOString();
    }

    params.set(key, value);
}

// Convert ISO dates to Date objects
function parseNeed(need) {
    need.startDate = new Date(need.startDate);
    need.endDate = new Date(need.endDate);
    return need;
}
