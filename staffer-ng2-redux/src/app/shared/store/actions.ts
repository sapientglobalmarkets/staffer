import * as Redux from 'redux';

/* ----- Action Types & Action Creators ----- */

export const RECEIVE_ALL_PROJECTS: string = 'RECEIVE_ALL_PROJECTS';
export var receiveAllProjects = (projectMap) => {
    return <Redux.Action>{
        type: RECEIVE_ALL_PROJECTS,
        projectMap: projectMap
    };
};

export const RECEIVE_ALL_SKILLS: string = 'RECEIVE_ALL_SKILLS';
export var receiveAllSkills = (skillMap) => {
    return <Redux.Action>{
        type: RECEIVE_ALL_SKILLS,
        skillMap: skillMap
    };
};

export const RECEIVE_ASSIGNMENT_RESPONSE: string = 'RECEIVE_ASSIGNMENT_RESPONSE';
export var receiveAssignmentResponse = (response) => {
    return <Redux.Action>{
        type: RECEIVE_ASSIGNMENT_RESPONSE,
        response: response
    };
};

export const RECEIVE_FILTERED_NEEDS: string = 'RECEIVE_FILTERED_NEEDS';
export var receiveFilteredNeeds = (response) => {
    return <Redux.Action>{
        type: RECEIVE_FILTERED_NEEDS,
        response: response
    };
};

export const RECEIVE_MATCHED_PEOPLE: string = 'RECEIVE_MATCHED_PEOPLE';
export var receiveMatchedPeople = (personMap) => {
    return <Redux.Action>{
        type: RECEIVE_MATCHED_PEOPLE,
        personMap: personMap
    };
};

export const SET_SELECTED_NEED: string = 'SET_SELECTED_NEED';
export var setSelectedNeed = (selectedNeedId) => {
    return <Redux.Action>{
        type: SET_SELECTED_NEED,
        selectedNeedId: selectedNeedId
    };
};
