import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Need, Person } from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'app-people-table',
    templateUrl: 'people-table.component.html',
    styleUrls: ['people-table.component.css']
})
export class PeopleTableComponent implements OnInit {

    @Input() people: Person[];
    @Input() selectedNeed: Need = null;
    @Output() personClicked = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    isAssignedToSelectedNeed(person: Person) {
        return person.id === this.selectedNeed.personId;
    }

    handleClick(event, person) {
        this.personClicked.emit({
            person: person,
            isChecked: event.target.checked
        });
    }
}
