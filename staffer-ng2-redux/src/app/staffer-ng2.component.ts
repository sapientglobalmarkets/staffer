import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { MdToolbar } from '@angular2-material/toolbar';

import { NeedsPanelComponent } from './needs-panel';
import { PeoplePanelComponent } from './people-panel';
import { NeedsService, PeopleService, ProjectsService, SkillsService } from './shared';
import { Need, NeedsSummary } from './shared/models/index';

@Component({
    moduleId: module.id,
    selector: 'staffer-ng2-app',
    templateUrl: 'staffer-ng2.component.html',
    styleUrls: ['staffer-ng2.component.css'],
    directives: [MdToolbar, NeedsPanelComponent, PeoplePanelComponent],
    providers: [HTTP_PROVIDERS, NeedsService, PeopleService, ProjectsService, SkillsService]
})
export class StafferNg2AppComponent {

    title = 'Staffer';
    needsSummary: NeedsSummary = new NeedsSummary();

    calculateNeedsSummary(needs: Need[]) : NeedsSummary {
        let needsSummary = new NeedsSummary();
        _.each(needs, (need: Need) => {
            need.personId ? needsSummary.closed++ : needsSummary.open++;
        });
        needsSummary.total = needs.length;
        return needsSummary;
    }
}
