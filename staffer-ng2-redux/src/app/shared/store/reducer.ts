import {
    RECEIVE_ALL_PROJECTS,
    RECEIVE_ALL_SKILLS,
    RECEIVE_ASSIGNMENT_RESPONSE,
    RECEIVE_FILTERED_NEEDS,
    RECEIVE_MATCHED_PEOPLE,
    SET_SELECTED_NEED
} from './actions';
import { Need, Person, Project, Skill } from '../models/index';

export class AppState {
    constructor(
        public needMap: any = {},
        public personMap: any = {},
        public projectMap: any = {},
        public skillMap: any = {},
        public allProjects: Project[] = [],
        public allSkills: Skill[] = [],
        public filteredNeeds: Need[] = [],
        public matchedPeople: Person[] = [],
        public selectedNeedId: number = null) {
    }
}

export const initialState: AppState = new AppState();

export var reducer = (state: AppState = initialState, action: any) => {

    console.log('reducer - action:', action);

    let nextState: AppState;

    let needMap: any;
    let personMap: any;
    let projectMap: any;
    let skillMap: any;

    let needsArray: Need[];
    let peopleArray: Person[];
    let projectsArray: Project[];
    let skillsArray: Skill[];

    switch (action.type) {

        case RECEIVE_ALL_PROJECTS:
            projectMap = action.projectMap;
            projectsArray = _.values(projectMap) as Project[];
            nextState = Object.assign({}, state, {
                projectMap: projectMap,
                allProjects: _.sortBy(projectsArray, 'name') as Project[]
            });
            break;

        case RECEIVE_ALL_SKILLS:
            skillMap = action.skillMap;
            skillsArray = _.values(skillMap) as Skill[];
            nextState = Object.assign({}, state, {
                skillMap: skillMap,
                allSkills: _.sortBy(skillsArray, 'name') as Skill[]
            });
            break;

        case RECEIVE_ASSIGNMENT_RESPONSE:
            // Merge response maps with state maps (make sure elements in response maps override those in state)
            let needId = action.response.need.id;
            needMap = _.extend({}, state.needMap, { needId: action.response.need });
            personMap = _.extend({}, state.personMap, action.response.personMap);

            nextState = Object.assign({}, state, {
                needMap: needMap,
                personMap: personMap,
            });
            break;

        case RECEIVE_FILTERED_NEEDS:
            // Merge response maps with state maps (make sure elements in response maps override those in state)
            needMap = _.extend({}, state.needMap, action.response.needMap);
            personMap = _.extend({}, state.personMap, action.response.personMap);
            projectMap = _.extend({}, state.projectMap, action.response.projectMap);
            skillMap = _.extend({}, state.skillMap, action.response.skillMap);

            needsArray = _.values(action.response.needMap) as Need[];

            nextState = Object.assign({}, state, {
                needMap: needMap,
                projectMap: projectMap,
                personMap: personMap,
                skillMap: skillMap,
                filteredNeeds: _.sortBy(needsArray, 'startDate') as Need[]
            });
            break;

        case RECEIVE_MATCHED_PEOPLE:
            // Merge response maps with state maps (make sure elements in response maps override those in state)
            personMap = _.extend({}, state.personMap, action.personMap);

            peopleArray = _.values(action.personMap) as Person[];

            nextState = Object.assign({}, state, {
                personMap: personMap,
                matchedPeople: _.sortBy(peopleArray, 'name') as Person[]
            });
            break;

        case SET_SELECTED_NEED:
            nextState = Object.assign({}, state, {
                selectedNeedId: action.selectedNeedId,
            });
            break;

        default:
            nextState = state;
            break;
    }

    return nextState;
}
