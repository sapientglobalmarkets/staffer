import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { MdToolbar } from "@angular2-material/toolbar/toolbar";
import { NeedsSummary } from "../shared/models/index";

@Component({
    moduleId: module.id,
    selector: 'app-bar',
    templateUrl: 'app-bar.component.html',
    styleUrls: [ 'app-bar.component.css' ],
    directives: [ MdToolbar ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBarComponent {

    @Input()
    summary:NeedsSummary;
}
