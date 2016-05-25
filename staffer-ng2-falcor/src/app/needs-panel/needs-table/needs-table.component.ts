import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';

import { FalcorNeed, Need } from '../../shared/models/index'

@Component({
    moduleId: module.id,
    selector: 'app-needs-table',
    templateUrl: 'needs-table.component.html',
    styleUrls: ['needs-table.component.css']
})
export class NeedsTableComponent implements OnInit, OnChanges {

    @Input() falcorNeeds: FalcorNeed[];
    @Input() projectMap: any;
    @Input() skillMap: any;
    @Input() personMap: any;
    @Output() needSelected = new EventEmitter();

    selectedNeed = null;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes['falcorNeeds'] && changes['falcorNeeds'].currentValue.length > 0) {
            this.handleClick(changes['falcorNeeds'].currentValue[0]);
        }
    }

    handleClick(need) {
        this.selectedNeed = need;
        this.needSelected.emit(this.selectedNeed);
    }
}
