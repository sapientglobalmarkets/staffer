import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { MdToolbar } from '@angular2-material/toolbar';

import { NeedsPanelComponent } from './needs-panel';
import { PeoplePanelComponent } from './people-panel';
import { NeedsService, EventService, PeopleService, ProjectsService, SkillsService } from './shared';
import { NeedsSummary } from './shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'staffer-ng2-app',
    templateUrl: 'staffer-ng2.component.html',
    styleUrls: ['staffer-ng2.component.css'],
    directives: [MdToolbar, NeedsPanelComponent, PeoplePanelComponent],
    providers: [HTTP_PROVIDERS, EventService, NeedsService, PeopleService, ProjectsService, SkillsService]
})
export class StafferNg2AppComponent {

    title = 'Staffer';
    needsSummary: NeedsSummary = new NeedsSummary();

    handleNeedsSummaryChanged(needsSummary: NeedsSummary) {
        this.needsSummary = needsSummary;
    }
}
