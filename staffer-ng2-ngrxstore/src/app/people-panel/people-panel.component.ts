import { Component, OnDestroy } from "@angular/core";
import { PeopleTableComponent } from "./people-table";
import { AppState } from "../shared";
import { Need, Person } from "../shared/models/index";
import { Store } from "@ngrx/store";
import { Subscription, Observable } from "rxjs/Rx";
import { ActionCreator } from "../shared/store/action-creator";

@Component({
    moduleId: module.id,
    selector: 'app-people-panel',
    templateUrl: 'people-panel.component.html',
    styleUrls: [ 'people-panel.component.css' ],
    directives: [ PeopleTableComponent ]
})
export class PeoplePanelComponent implements OnDestroy {
    people:Person[] = [];

    selectedNeed:Need = null;
    private subscription:Subscription;

    constructor(private store:Store<AppState>,
                private actionCreator:ActionCreator) {
        this.subscription = Observable.combineLatest(
            store.select('matchingPeople'),
            store.select('selectedNeed'),
            (people:Person[], selectedNeed:Need)=>({ people, selectedNeed })
        )
            .subscribe(({ people, selectedNeed })=> {
                this.people = people;
                this.selectedNeed = selectedNeed;
            });
    }

    ngOnDestroy():any {
        this.subscription.unsubscribe();
    }

    onPersonAssigned({ assigned, person }) {
        if (assigned) {
            this.actionCreator.assignPerson({
                person,
                need: this.selectedNeed
            });
        } else {
            this.actionCreator.unassignPerson({
                person,
                need: this.selectedNeed
            });
        }
    }

}
