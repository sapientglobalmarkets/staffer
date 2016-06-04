import { Component, OnInit, OnDestroy } from "@angular/core";
import { NeedsPanelComponent } from "./needs-panel";
import { PeoplePanelComponent } from "./people-panel";
import { ActionCreator } from "./shared/store/action-creator";
import { AppBarComponent } from "./app-bar/app-bar.component";
import { AppState } from "./shared/store/state";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs/Rx";
import { Need, NeedsSummary } from "./shared/models/index";

@Component({
    moduleId: module.id,
    selector: 'staffer-ng2-app',
    templateUrl: 'staffer-ng2.component.html',
    styleUrls: [ 'staffer-ng2.component.css' ],
    directives: [ AppBarComponent, NeedsPanelComponent, PeoplePanelComponent ]
})
export class StafferNg2AppComponent implements OnInit, OnDestroy {
    title = 'Staffer';
    private subscription:Subscription;
    private summary:NeedsSummary;

    constructor(private store:Store<AppState>, private actionCreator:ActionCreator) {
        this.subscription = store.select('matchingNeeds')
            .subscribe((needs:Need[])=> {
                this.summary = this.calculateNeedsSummary(needs);
            });
    }

    ngOnInit():any {
        this.actionCreator.loadProjects();
        this.actionCreator.loadSkills();
        this.actionCreator.loadSkills();
    }

    ngOnDestroy():any {
        this.subscription.unsubscribe();
    }

    calculateNeedsSummary(needs:Need[]):NeedsSummary {
        let needsSummary = new NeedsSummary();
        _.each(needs, (need:Need) => {
            need.personId ? needsSummary.closed++ : needsSummary.open++;
        });
        needsSummary.total = needs.length;
        return needsSummary;
    }

}
