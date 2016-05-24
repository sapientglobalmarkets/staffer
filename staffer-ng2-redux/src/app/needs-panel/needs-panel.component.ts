import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { NeedsFilterComponent } from './needs-filter';
import { NeedsTableComponent } from './needs-table';
import { NeedsService, ProjectsService, SkillsService } from '../shared';
import { FilterState, Need, Project, Skill } from '../shared/models/index'
import {
    receiveAllProjects,
    receiveAllSkills,
    receiveFilteredNeeds,
    setSelectedNeed
} from '../shared/store/actions';
import { AppState } from '../shared/store/reducer';

@Component({
    moduleId: module.id,
    selector: 'app-needs-panel',
    templateUrl: 'needs-panel.component.html',
    styleUrls: ['needs-panel.component.css'],
    directives: [NeedsFilterComponent, NeedsTableComponent]
})
export class NeedsPanelComponent implements OnInit, OnDestroy {

    personMap: any;
    projectMap: any;
    skillMap: any;

    allProjects: Project[];
    allSkills: Skill[];

    filteredNeeds: Need[];

    selectedNeedId: number;

    private personMapSubscription: Subscription;
    private projectMapSubscription: Subscription;
    private skillMapSubscription: Subscription;
    private allProjectsSubscription: Subscription;
    private allSkillsSubscription: Subscription;
    private filteredNeedsSubscription: Subscription;
    private selectedNeedSubscription: Subscription;

    constructor(
        private needsService: NeedsService,
        private projectsService: ProjectsService,
        private skillsService: SkillsService,
        private ngRedux: NgRedux<AppState>) {
    }

    ngOnInit() {
        this.personMapSubscription = this.ngRedux
            .select<any>(state => state.personMap)
            .subscribe(personMap => {
                console.log('NeedsPanel.personMap', personMap);
                this.personMap = personMap;
            });

        this.projectMapSubscription = this.ngRedux
            .select<any>(state => state.projectMap)
            .subscribe(projectMap => {
                console.log('NeedsPanel.projectMap', projectMap);
                this.projectMap = projectMap;
            });

        this.skillMapSubscription = this.ngRedux
            .select<any>(state => state.skillMap)
            .subscribe(skillMap => {
                console.log('NeedsPanel.skillMap', skillMap);
                this.skillMap = skillMap;
            });

        this.allProjectsSubscription = this.ngRedux
            .select<Project[]>(state => state.allProjects)
            .subscribe(allProjects => {
                console.log('NeedsPanel.allProjects', allProjects);
                this.allProjects = allProjects;
            });

        this.allSkillsSubscription = this.ngRedux
            .select<Skill[]>(state => state.allSkills)
            .subscribe(allSkills => {
                console.log('NeedsPanel.allSkills', allSkills);
                this.allSkills = allSkills;
            });

        this.filteredNeedsSubscription = this.ngRedux
            .select<Need[]>(state => state.filteredNeeds)
            .subscribe(filteredNeeds => {
                console.log('NeedsPanel.filteredNeeds', filteredNeeds);
                this.filteredNeeds = filteredNeeds;
            });

        this.selectedNeedSubscription = this.ngRedux
            .select<number>(state => state.selectedNeedId)
            .subscribe(selectedNeedId => {
                console.log('NeedsPanel.selectedNeedId', selectedNeedId);
                this.selectedNeedId = selectedNeedId;
            });

        // Trigger getting of all projects and skills
        this.getAllProjects();
        this.getAllSkills();
    }

    ngOnDestroy() {
        this.personMapSubscription.unsubscribe();
        this.projectMapSubscription.unsubscribe();
        this.skillMapSubscription.unsubscribe();
        this.allProjectsSubscription.unsubscribe();
        this.allSkillsSubscription.unsubscribe();
        this.filteredNeedsSubscription.unsubscribe();
        this.selectedNeedSubscription.unsubscribe();
    }

    handleFilterChanged(filterState: FilterState) {
        this.getFilteredNeeds(filterState);
    }

    handleNeedSelected(selectedNeedId: number) {
        this.ngRedux.dispatch(setSelectedNeed(selectedNeedId));
    }

    getFilteredNeeds(filterState: FilterState) {
        this.needsService.getNeeds(filterState)
            .subscribe(response => this.ngRedux.dispatch(receiveFilteredNeeds(response)));
    }

    getAllProjects() {
        this.projectsService.getProjects()
            .subscribe(projectMap => this.ngRedux.dispatch(receiveAllProjects(projectMap)));
    }

    getAllSkills() {
        this.skillsService.getSkills()
            .subscribe(skillMap => this.ngRedux.dispatch(receiveAllSkills(skillMap)));
    }
}
