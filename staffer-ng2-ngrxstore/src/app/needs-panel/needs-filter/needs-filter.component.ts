import {
    Component,
    EventEmitter,
    Input,
    Output,
    ChangeDetectionStrategy,
    ChangeDetectorRef, OnInit
} from "@angular/core";
import { MdButton } from "@angular2-material/button";
import { MD_INPUT_DIRECTIVES } from "@angular2-material/input";
import { FilterState, Project, Skill, Status } from "../../shared/models/index";
import { Store } from "@ngrx/store";
import { AppState } from "../../shared/store/state";

@Component({
    moduleId: module.id,
    selector: 'app-needs-filter',
    templateUrl: 'needs-filter.component.html',
    styleUrls: [ 'needs-filter.component.css' ],
    directives: [ MdButton, MD_INPUT_DIRECTIVES ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeedsFilterComponent implements OnInit {
    filterState:FilterState = new FilterState();

    @Input()
    statuses:Status[] = [];

    @Input()
    projects:Project[];

    @Input()
    skills:Skill[];

    @Output()
    filterChange = new EventEmitter<FilterState>();

    constructor(private store:Store<AppState>,
                ref:ChangeDetectorRef) {

        store.select('filter')
            .subscribe((filter:FilterState)=> {
                this.filterState = filter;
                ref.markForCheck();
            });

    }

    ngOnInit():any {
        this.notifyFilterChange();
    }

    notifyFilterChange() {
        this.filterChange.emit(this.filterState);
    }
}
