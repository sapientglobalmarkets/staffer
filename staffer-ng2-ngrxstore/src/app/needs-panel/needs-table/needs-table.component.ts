import {
    Component, EventEmitter, Input, Output,
    ChangeDetectionStrategy
} from "@angular/core";
import { Need } from "../../shared/models/index";
import { EntityCache } from "../../shared/store/state";

@Component({
    moduleId: module.id,
    selector: 'app-needs-table',
    templateUrl: 'needs-table.component.html',
    styleUrls: [ 'needs-table.component.css' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeedsTableComponent {

    @Input() needs:Need[];
    @Input() cache:EntityCache;
    @Output() needSelected = new EventEmitter();

    selectedNeed = null;

    onNeedClick(need) {
        this.selectedNeed = need;
        this.needSelected.emit(this.selectedNeed);
    }

    getProjectName(projectId) {
        return this.cache && this.cache.projects[ projectId ].name;
    }

    getSkillName(skillId) {
        return this.cache && this.cache.skills[ skillId ].name;
    }

    getPersonName(personId) {
        return personId ? this.cache.people[ personId ].name : null;
    }
}
