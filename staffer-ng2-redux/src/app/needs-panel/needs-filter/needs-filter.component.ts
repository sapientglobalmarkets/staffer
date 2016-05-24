import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

import { FilterState, Project, Skill } from '../../shared/models/index'

@Component({
    moduleId: module.id,
    selector: 'app-needs-filter',
    templateUrl: 'needs-filter.component.html',
    styleUrls: ['needs-filter.component.css'],
    directives: [MdButton, MD_INPUT_DIRECTIVES]
})
export class NeedsFilterComponent implements OnInit {

    filterState: FilterState = new FilterState();

    statuses = [
        { id: 'all', name: 'All'},
        { id: 'open', name: 'Open'},
        { id: 'closed', name: 'Closed'}
    ];

    @Input() allProjects: Project[];
    @Input() allSkills: Skill[];

    @Output() filterChanged = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        this.handleFilterChanged();
    }

    handleFilterChanged() {
        this.filterChanged.emit(this.filterState);
    }
}
