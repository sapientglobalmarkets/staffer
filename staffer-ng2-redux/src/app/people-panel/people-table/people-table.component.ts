import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Need, Person } from '../../shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'app-people-table',
    templateUrl: 'people-table.component.html',
    styleUrls: ['people-table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleTableComponent implements OnInit {

    @Input() needMap: any;

    @Input() matchedPeople: Person[];

    @Input() selectedNeedId: number;

    @Output() personClicked = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    isAssignedToSelectedNeed(person: Person) {
        return person.id === this.needMap[this.selectedNeedId].personId;
    }

    handleClick(event, person) {
        this.personClicked.emit({
            person: person,
            isChecked: event.target.checked
        });
    }
}
