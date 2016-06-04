import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./state";
import {
    NeedsService,
    PeopleService,
    SkillsService,
    ProjectsService
} from "../index";
import { FilterState, Need } from "../models/index";

@Injectable()
export class ActionCreator {

    constructor(private projectService:ProjectsService,
                private skillsService:SkillsService,
                private peopleService:PeopleService,
                private needsService:NeedsService,
                private store:Store<AppState>) {
    }

    changeFilter(filterState) {
        return {
            type: 'CHANGE_FILTER',
            payload: filterState
        };
    }

    loadProjects() {
        this.projectService.getProjects()
            .subscribe(projects=> {
                this.store.dispatch({
                    type: 'LOAD_PROJECTS',
                    payload: projects
                });
            });
    }

    loadSkills() {
        this.skillsService.getSkills()
            .subscribe(skills=> {
                this.store.dispatch({
                    type: 'LOAD_SKILLS',
                    payload: skills
                });
            });
    }

    loadNeeds(filterState:FilterState) {
        this.needsService.getNeeds(filterState)
            .subscribe(results=> {
                this.store.dispatch({
                    type: 'LOAD_MATCHING_NEEDS',
                    payload: results
                });
            });
    }

    showPeopleForNeed(need:Need) {
        this.peopleService.getPeople(need)
            .subscribe(results=> {
                this.store.dispatch({
                    type: 'LOAD_MATCHING_PEOPLE',
                    payload: results
                });
            });
    }

    assignPerson({ person, need }) {
        this.peopleService.assign(person, need)
            .subscribe(results=> {
                this.store.dispatch({
                    type: 'ASSIGN_PERSON',
                    payload: Object.assign({}, results, { needId: need.id })
                });
            });
    }

    unassignPerson({ person, need }) {
        this.peopleService.unassign(person, need)
            .subscribe(results=> {
                this.store.dispatch({
                    type: 'UNASSIGN_PERSON',
                    payload: Object.assign({}, results, { needId: need.id })
                });
            });
    }

    setSelectedNeed(need:Need) {
        this.store.dispatch({
            type: 'SET_SELECTED_NEED',
            payload: need
        });
    }
}
