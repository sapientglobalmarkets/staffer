import {
    Component,
    EventEmitter,
    Input,
    Output,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from "@angular/core";
import { MdButton } from "@angular2-material/button";
import { MD_INPUT_DIRECTIVES } from "@angular2-material/input";
import {
    FilterState,
    Project,
    Skill,
    AppState
} from "../../shared/models/index";
import { Store } from "@ngrx/store";
import { changeFilter } from "../../shared/store/actions";

@Component({
    moduleId: module.id,
    selector: 'app-needs-filter',
    templateUrl: 'needs-filter.component.html',
    styleUrls: [ 'needs-filter.component.css' ],
    directives: [ MdButton, MD_INPUT_DIRECTIVES ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeedsFilterComponent {

    filterState:FilterState = new FilterState();

    statuses = [
        { id: 'all', name: 'All' },
        { id: 'open', name: 'Open' },
        { id: 'closed', name: 'Closed' }
    ];

    @Input() projects:Project[];
    @Input() skills:Skill[];
    @Output() filterChanged = new EventEmitter();

    constructor(private store:Store<AppState>, ref:ChangeDetectorRef) {
        store.select('filter')
            .subscribe((state:FilterState)=> {
                this.filterState = state;
                ref.markForCheck();
            })
    }

    handleFilterChanged() {
        this.store.dispatch(changeFilter(this.filterState));
    }
}
