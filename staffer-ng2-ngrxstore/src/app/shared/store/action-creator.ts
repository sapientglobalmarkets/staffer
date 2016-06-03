import { Injectable } from "@angular/core";
import { ProjectsService } from "../services/projects.service";
import { SkillsService } from "../services/skills.service";
import { Store } from "@ngrx/store";
import { AppState } from "./state";
import { NeedsService } from "../services/needs.service";
import { FilterState } from "../models/index";

@Injectable()
export class ActionCreator {

    constructor(private projectService:ProjectsService,
                private skillsService:SkillsService,
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
                })
            });
    }

    loadSkills() {
        this.skillsService.getSkills()
            .subscribe(skills=> {
                this.store.dispatch({
                    type: 'LOAD_SKILLS',
                    payload: skills
                })
            });
    }

    loadNeeds(filterState:FilterState) {
        this.needsService.getNeeds(filterState)
            .subscribe(results=> {
                this.store.dispatch({
                    type: 'LOAD_NEEDS',
                    payload: results
                })
            });
    }
}
