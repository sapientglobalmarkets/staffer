import { Component } from "@angular/core";
import { MdToolbar } from "@angular2-material/toolbar";
import { NeedsPanelComponent } from "./needs-panel";
import { PeoplePanelComponent } from "./people-panel";
import { EventService } from "./shared";
import { NeedsSummary } from "./shared/models/index";
import { ActionCreator } from "./shared/store/action-creator";

@Component({
    moduleId: module.id,
    selector: 'staffer-ng2-app',
    templateUrl: 'staffer-ng2.component.html',
    styleUrls: [ 'staffer-ng2.component.css' ],
    directives: [ MdToolbar, NeedsPanelComponent, PeoplePanelComponent ],
    providers: [ EventService ]
})
export class StafferNg2AppComponent {

    title = 'Staffer';
    needsSummary:NeedsSummary = new NeedsSummary();

    constructor(actionCreator:ActionCreator) {

        actionCreator.loadProjects();
        actionCreator.loadSkills();
    }

    handleNeedsSummaryChanged(needsSummary:NeedsSummary) {
        this.needsSummary = needsSummary;
    }
}
