import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { PeopleTableComponent } from './people-table';
import { PeopleService } from '../shared'
import { Need, Person } from '../shared/models/index'
import {
    receiveAssignmentResponse,
    receiveMatchedPeople
} from '../shared/store/actions';
import { AppState } from '../shared/store/reducer';

@Component({
    moduleId: module.id,
    selector: 'app-people-panel',
    templateUrl: 'people-panel.component.html',
    styleUrls: ['people-panel.component.css'],
    directives: [PeopleTableComponent]
})
export class PeoplePanelComponent implements OnInit, OnDestroy {

    needMap: any;
    personMap: any;

    matchedPeople: number[];

    selectedNeedId: number;

    private needMapSubscription: Subscription;
    private personMapSubscription: Subscription;
    private matchedPeopleSubscription: Subscription;
    private selectedNeedSubscription: Subscription;

    constructor(
        private peopleService: PeopleService,
        private ngRedux: NgRedux<AppState>) {
    }

    ngOnInit() {
        this.needMapSubscription = this.ngRedux
            .select<any>(state => state.needMap)
            .subscribe(needMap => {
                // console.log('PeoplePanel.needMap', needMap);
                this.needMap = needMap;
            });

        this.personMapSubscription = this.ngRedux
            .select<any>(state => state.personMap)
            .subscribe(personMap => {
                // console.log('PeoplePanel.personMap', personMap);
                this.personMap = personMap;
            });

        this.matchedPeopleSubscription = this.ngRedux
            .select<number[]>(state => state.matchedPeople)
            .subscribe(matchedPeople => {
                // console.log('PeoplePanel.matchedPeople', matchedPeople);
                this.matchedPeople = matchedPeople;
            });

        this.selectedNeedSubscription = this.ngRedux
            .select<number>(state => state.selectedNeedId)
            .subscribe(selectedNeedId => {
                // console.log('PeoplePanel.selectedNeedId', selectedNeedId);
                this.selectedNeedId = selectedNeedId;
                this.handleNeedSelected(selectedNeedId);
            });
    }

    ngOnDestroy() {
        this.needMapSubscription.unsubscribe();
        this.personMapSubscription.unsubscribe();
        this.matchedPeopleSubscription.unsubscribe();
        this.selectedNeedSubscription.unsubscribe();
    }

    handleNeedSelected(selectedNeedId: number) {
        // Guard against selectedNeedId = null
        if (!selectedNeedId) return;

        this.peopleService.getPeople(this.needMap[selectedNeedId])
            .subscribe(personMap => this.ngRedux.dispatch(receiveMatchedPeople(personMap)));
    }

    handlePersonClicked(event: any) {
        if (event.isChecked) {
            // Assign the person to the selected need
            this.peopleService.assign(event.personId, this.selectedNeedId)
                .subscribe(response => this.ngRedux.dispatch(receiveAssignmentResponse(response)));
        }
        else {
            // Unassign the person from the selected need
            this.peopleService.unassign(event.personId, this.selectedNeedId)
                .subscribe(response => this.ngRedux.dispatch(receiveAssignmentResponse(response)));
        }
    }
}
