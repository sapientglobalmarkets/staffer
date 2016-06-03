import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange
} from '@angular/core';

import { Need } from '../../shared/models/index'

@Component({
    moduleId: module.id,
    selector: 'app-needs-table',
    templateUrl: 'needs-table.component.html',
    styleUrls: [ 'needs-table.component.css' ]
})
export class NeedsTableComponent implements OnInit, OnChanges {

    @Input() needs:Need[];
    @Input() projectMap:any;
    @Input() skillMap:any;
    @Input() personMap:any;
    @Output() needSelected = new EventEmitter();

    selectedNeed = null;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes:{[propName:string]:SimpleChange}) {
        if (changes[ 'needs' ] && changes[ 'needs' ].currentValue.length > 0) {
            this.handleClick(changes[ 'needs' ].currentValue[ 0 ]);
        }
    }

    handleClick(need) {
        this.selectedNeed = need;
        this.needSelected.emit(this.selectedNeed);
    }

    getProjectName(projectId) {
        return this.projectMap[ projectId ].name;
    }

    getSkillName(skillId) {
        return this.skillMap[ skillId ].name;
    }

    getPersonName(personId) {
        return personId ? this.personMap[ personId ].name : null;
    }
}
