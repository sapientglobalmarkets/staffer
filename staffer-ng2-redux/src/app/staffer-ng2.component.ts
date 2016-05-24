import { Component, OnInit, OnDestroy } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { MdToolbar } from '@angular2-material/toolbar';
import { NgRedux } from 'ng2-redux';
import { Subscription } from 'rxjs';

import { NeedsPanelComponent } from './needs-panel';
import { PeoplePanelComponent } from './people-panel';
import { NeedsService, PeopleService, ProjectsService, SkillsService } from './shared';
import { Need, NeedsSummary } from './shared/models/index';
import { AppState } from './shared/store/reducer';

@Component({
    moduleId: module.id,
    selector: 'staffer-ng2-app',
    templateUrl: 'staffer-ng2.component.html',
    styleUrls: ['staffer-ng2.component.css'],
    directives: [MdToolbar, NeedsPanelComponent, PeoplePanelComponent],
    providers: [HTTP_PROVIDERS, NeedsService, PeopleService, ProjectsService, SkillsService]
})
export class StafferNg2AppComponent implements OnInit, OnDestroy {

    title = 'Staffer';

    needMap: any;
    filteredNeeds: number[];
    needsSummary: NeedsSummary = new NeedsSummary();

    private needMapSubscription: Subscription;
    private filteredNeedsSubscription: Subscription;

    constructor(
        private needsService: NeedsService,
        private projectsService: ProjectsService,
        private skillsService: SkillsService,
        private ngRedux: NgRedux<AppState>) {
    }

    ngOnInit() {
        this.needMapSubscription = this.ngRedux
            .select<any>(state => state.needMap)
            .subscribe(needMap => {
                // console.log('StafferApp.needMap', needMap);
                this.needMap = needMap;
                this.calculateNeedsSummary();
            });

        this.filteredNeedsSubscription = this.ngRedux
            .select<number[]>(state => state.filteredNeeds)
            .subscribe(filteredNeeds => {
                // console.log('StafferApp.filteredNeeds', filteredNeeds);
                this.filteredNeeds = filteredNeeds;
                this.calculateNeedsSummary();
            });
    }

    ngOnDestroy() {
        this.needMapSubscription.unsubscribe();
        this.filteredNeedsSubscription.unsubscribe();
    }

    calculateNeedsSummary() {

        if (!this.filteredNeeds) return;

        this.needsSummary.reset();

        _.each(this.filteredNeeds, (needId: number) => {
            let need = this.needMap[needId];
            need.personId ? this.needsSummary.closed++ : this.needsSummary.open++;
        });
        this.needsSummary.total = this.filteredNeeds.length;
    }
}
