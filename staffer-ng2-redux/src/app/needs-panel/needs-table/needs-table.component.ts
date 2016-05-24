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

    @Input() personMap: any;
    @Input() projectMap: any;
    @Input() skillMap: any;

    @Input() filteredNeeds: Need[];

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

    handleClick(need) {
        this.needSelected.emit(need.id);
    }

    getProjectName(projectId) {
        return this.projectMap[projectId] ? this.projectMap[projectId].name : null;
    }

    getSkillName(skillId) {
        return this.skillMap[skillId] ? this.skillMap[skillId].name : null;
    }

    getPersonName(personId) {
        if (personId && this.personMap[personId]) {
            return this.personMap[personId].name;
        }
        else {
            return null;
        }
    }
}
