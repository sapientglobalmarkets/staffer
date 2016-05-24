import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';

import { Need } from '../../shared/models/index'

@Component({
    moduleId: module.id,
    selector: 'app-needs-table',
    templateUrl: 'needs-table.component.html',
    styleUrls: ['needs-table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeedsTableComponent implements OnInit, OnChanges {

    @Input() needMap: any;
    @Input() personMap: any;
    @Input() projectMap: any;
    @Input() skillMap: any;

    @Input() filteredNeeds: number[];

    @Input() selectedNeedId: number;

    @Output() needSelected = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes['filteredNeeds'] && changes['filteredNeeds'].currentValue.length > 0) {
            this.handleClick(changes['filteredNeeds'].currentValue[0]);
        }
    }

    handleClick(needId) {
        this.needSelected.emit(needId);
    }

    getStartDate(needId) {
        return this.needMap[needId].startDate;
    }

    getEndDate(needId) {
        return this.needMap[needId].endDate;
    }

    getProjectName(needId) {
        let projectId = this.needMap[needId].projectId;
        return this.projectMap[projectId] ? this.projectMap[projectId].name : null;
    }

    getSkillName(needId) {
        let skillId = this.needMap[needId].skillId;
        return this.skillMap[skillId] ? this.skillMap[skillId].name : null;
    }

    getPersonName(needId) {
        let personId = this.needMap[needId].personId;
        if (personId && this.personMap[personId]) {
            return this.personMap[personId].name;
        }
        else {
            return null;
        }
    }
}
