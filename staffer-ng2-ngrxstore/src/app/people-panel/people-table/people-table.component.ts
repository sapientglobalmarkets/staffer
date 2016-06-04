import {
    Component, EventEmitter, Input, OnInit, Output,
    ChangeDetectionStrategy
} from '@angular/core';

import { Need, Person } from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'app-people-table',
    templateUrl: 'people-table.component.html',
    styleUrls: [ 'people-table.component.css' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleTableComponent implements OnInit {

    @Input() people:Person[];
    @Input() selectedNeed:Need = null;
    @Output() personAssigned = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    isAssignedToSelectedNeed(person:Person) {
        return !!(this.selectedNeed && person.id === this.selectedNeed.personId);
    }

    onPersonClick(event, person) {
        this.personAssigned.emit({
            person: person,
            assigned: event.target.checked
        });
    }
}
