import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { PeopleTableComponent } from './people-table';
import { EventService, PeopleService } from '../shared'
import { Need, Person } from '../shared/models/index'

@Component({
    moduleId: module.id,
    selector: 'app-people-panel',
    templateUrl: 'people-panel.component.html',
    styleUrls: ['people-panel.component.css'],
    directives: [PeopleTableComponent]
})
export class PeoplePanelComponent implements OnInit {

    people: Person[] = [];
    selectedNeed: Need = null;

    constructor(
        private peopleService: PeopleService,
        private eventService: EventService) {
    }

    ngOnInit() {
        this.eventService.selectedNeed$
            .subscribe(selectedNeed => this.handleNeedSelected(selectedNeed));
    }

    handleNeedSelected(selectedNeed: Need) {
        this.selectedNeed = selectedNeed;
        this.peopleService.getPeople(selectedNeed)
            .subscribe(personMap => this.extractPeople(personMap));
    }

    extractPeople(personMap: any) {
        let peopleArray = _.values(personMap);
        this.people = _.sortBy(peopleArray, 'name') as Person[];
    }

    handlePersonClicked(event: any) {
        if (event.isChecked) {
            // Assign the person to the selected need
            this.peopleService.assign(event.person, this.selectedNeed)
                .subscribe(result => this.mergeAssignmentResult(result));
        }
        else {
            // Unassign the person from the selected need
            this.peopleService.unassign(event.person, this.selectedNeed)
                .subscribe(result => this.mergeAssignmentResult(result));
        }
    }

    mergeAssignmentResult(result: any) {

        // Merge need
        this.selectedNeed = Object.assign({}, this.selectedNeed, result.need);

        // Merge people
        _.each(result.people, person => {
            let existingPerson = _.find(this.people, {'id': person.id});
            if (existingPerson) {
                Object.assign(existingPerson, person);
            }
        });
    }
}
