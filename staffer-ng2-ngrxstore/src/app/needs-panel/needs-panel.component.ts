import { Component, OnInit, OnDestroy } from "@angular/core";
import * as _ from "lodash";
import { NeedsFilterComponent } from "./needs-filter";
import { NeedsTableComponent } from "./needs-table";
import {
    Need,
    NeedsSummary,
    Project,
    Skill,
    Status
} from "../shared/models/index";
import { Store } from "@ngrx/store";
import { AppState, EntityCache } from "../shared/store/state";
import { ActionCreator } from "../shared/store/action-creator";
import { Subscription } from "rxjs/Rx";

@Component({
    moduleId: module.id,
    selector: 'app-needs-panel',
    templateUrl: 'needs-panel.component.html',
    styleUrls: [ 'needs-panel.component.css' ],
    directives: [ NeedsFilterComponent, NeedsTableComponent ]
})
export class NeedsPanelComponent implements OnInit, OnDestroy {
    needMap:any = {};

    cache:EntityCache = new EntityCache();
    skillMap:any = {};
    personMap:any = {};
    needs:Need[] = [];

    allProjects:Project[] = [];

    allSkills:Skill[] = [];
    allStatuses:Status[] = [];
    private subscription:Subscription;

    constructor(private actionCreator:ActionCreator,
                private store:Store<AppState>) {

    }

    ngOnInit() {

        this.subscription = this.store
            .subscribe((state:AppState)=> {
                this.allProjects = state.projects;
                this.allSkills = state.skills;
                this.allStatuses = state.statuses;


                this.needs = state.matchingNeeds;
                this.cache = state.cache;
            });

        
    }

    ngOnDestroy():any {
        this.subscription.unsubscribe();
    }

    onFilterChange(filterState) {
        this.actionCreator.loadNeeds(filterState);
    }

    onNeedSelected(need:Need) {
        this.actionCreator.setSelectedNeed(need);
        this.actionCreator.showPeopleForNeed(need);
    }

}
