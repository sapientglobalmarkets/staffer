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
        public filteredNeeds: number[] = [],
        public matchedPeople: number[] = [],
        public selectedNeedId: number = null) {
    }
}

export const initialState: AppState = new AppState();

export var reducer = (state: AppState = initialState, action: any) => {

    // console.log('reducer - action:', action);

    let nextState: AppState;

    let needMap: any;
    let personMap: any;
    let projectMap: any;
    let skillMap: any;

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
            needMap = _.extend({}, state.needMap, action.response.needMap);
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

            let filteredNeeds = _.chain(action.response.needMap)
                .values()
                .sortBy('startDate')
                .map((need: Need) => need.id)
                .value();

            nextState = Object.assign({}, state, {
                needMap: needMap,
                projectMap: projectMap,
                personMap: personMap,
                skillMap: skillMap,
                filteredNeeds: filteredNeeds
            });
            break;

        case RECEIVE_MATCHED_PEOPLE:
            // Merge response maps with state maps (make sure elements in response maps override those in state)
            personMap = _.extend({}, state.personMap, action.personMap);

            let matchedPeople = _.chain(action.personMap)
                .values()
                .sortBy('name')
                .map((person: Person) => person.id)
                .value();

            nextState = Object.assign({}, state, {
                personMap: personMap,
                matchedPeople: matchedPeople
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
