import 'whatwg-fetch';
import UrlSearchParams from 'url-search-params';

import {
    SET_FILTER_FIELD,
    SET_SELECTED_NEED,
    RECEIVE_PROJECTS,
    RECEIVE_SKILLS,
    RECEIVE_FILTERED_NEEDS,
    RECEIVE_MATCHED_PEOPLE
} from './constants';

import { getFilter } from './selectors';


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

export function setSelectedNeed(selectedNeedId) {
    return {
        type: SET_SELECTED_NEED,
        selectedNeedId: selectedNeedId
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

export function fetchProjects() {
    return dispatch => {
        return fetch(PROJECTS_URL)
            .then(response => response.json())
            .then(projectMap => dispatch(receiveProjects(projectMap)))
            .catch(function(e) {
                console.log('Failed to fetch projects:', e.message);
            })
    };
}

export function fetchSkills() {
    return dispatch => {
        return fetch(SKILLS_URL)
            .then(response => response.json())
            .then(skillMap => dispatch(receiveSkills(skillMap)))
            .catch(function(e) {
                console.log('Failed to fetch skills:', e.message);
            })
    };
}

export function fetchNeeds() {
    return (dispatch, getState) => {

        let staffingState = getState().staffing;
        const {minStartDate, maxStartDate, projectId, skillId, status} = getFilter(staffingState);

        let params = new UrlSearchParams();
        setIfValue('projectId', projectId, params);
        setIfValue('skillId', skillId, params);
        setIfValue('minStartDate', minStartDate, params);
        setIfValue('maxStartDate', maxStartDate, params);
        setIfValue('status', status, params);

        return fetch(`${NEEDS_URL}?${params}`)
            .then(response => response.json())
            .then(({needMap, projectMap, personMap, skillMap}) =>
                dispatch(receiveFilteredNeeds(needMap, projectMap, personMap, skillMap)))
            .catch(function(e) {
                console.log('Failed to fetch needs:', e.message);
            })
    };
}

export function fetchPeopleForNeed(need) {
    return (dispatch) => {

        const {id, skillId, startDate, endDate} = need;

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
                console.log('Failed to fetch people:', e.message);
            })
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
