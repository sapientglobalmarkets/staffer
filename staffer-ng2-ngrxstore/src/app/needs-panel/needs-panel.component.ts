import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';

import { NeedsFilterComponent } from './needs-filter';
import { NeedsTableComponent } from './needs-table';
import {
    EventService,
    NeedsService,
    ProjectsService,
    SkillsService
} from '../shared';
import {
    FilterState,
    Need,
    NeedsSummary,
    Project,
    Skill, AppState
} from '../shared/models/index'
import { Store } from "@ngrx/store";

@Component({
    moduleId: module.id,
    selector: 'app-needs-panel',
    templateUrl: 'needs-panel.component.html',
    styleUrls: [ 'needs-panel.component.css' ],
    directives: [ NeedsFilterComponent, NeedsTableComponent ]
})
export class NeedsPanelComponent implements OnInit {

    needMap:any = {};
    projectMap:any = {};
    skillMap:any = {};
    personMap:any = {};

    needs:Need[] = [];

    @Output() needsSummaryChanged = new EventEmitter();

    // Full list needed for filters
    allProjects:Project[] = [];
    allSkills:Skill[] = [];

    constructor(private eventService:EventService,
                private needsService:NeedsService,
                private projectsService:ProjectsService,
                private skillsService:SkillsService,
                private store:Store<AppState>) {

    }

    ngOnInit() {
        this.getAllProjects();
        this.getAllSkills();

        this.store.select('filter')
            .subscribe((filterState:FilterState)=> {
                this.getNeeds(filterState);
            });
    }

    handleNeedSelected(selectedNeed:Need) {
        this.eventService.selectNeed(selectedNeed);
    }

    getNeeds(filterState:FilterState) {
        this.needsService.getNeeds(filterState)
            .subscribe(result => this.extractNeeds(result));
    }

    extractNeeds(result:any) {
        this.needMap = result.needMap;
        this.projectMap = result.projectMap;
        this.skillMap = result.skillMap;
        this.personMap = result.personMap;

        let needsArray = _.values(result.needMap);
        this.needs = _.sortBy(needsArray, 'startDate') as Need[];

        this.emitNeedsSummary();
    }

    emitNeedsSummary() {
        let needsSummary = this.calculateNeedsSummary(this.needs);
        this.needsSummaryChanged.emit(needsSummary);
    }

    calculateNeedsSummary(needs:Need[]):NeedsSummary {
        let needsSummary = new NeedsSummary();
        _.each(needs, (need:Need) => {
            need.personId ? needsSummary.closed++ : needsSummary.open++;
        });
        needsSummary.total = needs.length;
        return needsSummary;
    }

    getAllProjects() {
        this.projectsService.getProjects()
            .subscribe(projectMap => this.extractProjects(projectMap));
    }

    extractProjects(projectMap:any) {
        let projectsArray = _.values(projectMap);
        this.allProjects = _.sortBy(projectsArray, 'name') as Project[];
    }

    getAllSkills() {
        this.skillsService.getSkills()
            .subscribe(skillMap => this.extractSkills(skillMap));
    }

    extractSkills(skillMap:any) {
        let skillsArray = _.values(skillMap);
        this.allSkills = _.sortBy(skillsArray, 'name') as Skill[];
    }
}
