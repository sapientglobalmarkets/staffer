import {
    FilterState,
    Status,
    Project,
    Skill,
    Need,
    Person
} from "../models/index";

export class EntityCache {
    projects: {};
    skills: {};
    people: {}
}
export interface AppState {
    filter:FilterState;
    projects:Project[];
    skills:Skill[];
    statuses:Status[];
    matchingNeeds:Need[];
    matchingPeople:Person[];

    cache:EntityCache;
}

export const initialState:AppState = {
    filter: new FilterState(),
    projects: [],
    skills: [],
    statuses: [
        { id: 'all', name: 'All' },
        { id: 'open', name: 'Open' },
        { id: 'closed', name: 'Closed' }
    ],
    matchingNeeds: [],
    matchingPeople: [],
    cache: new EntityCache()
};
