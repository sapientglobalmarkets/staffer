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
    @Input() personMap: any;

    @Input() matchedPeople: number[];

    @Input() selectedNeedId: number;

    @Output() personClicked = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    isAssignedToSelectedNeed(personId: number) {
        return personId === this.needMap[this.selectedNeedId].personId;
    }

    handleClick(event, personId) {
        this.personClicked.emit({
            personId: personId,
            isChecked: event.target.checked
        });
    }

    getName(personId: number) {
        return this.personMap[personId].name;
    }

    getEmail(personId: number) {
        return this.personMap[personId].email;
    }

    getPhone(personId: number) {
        return this.personMap[personId].phone;
    }
}
