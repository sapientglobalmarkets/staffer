import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Need } from '../models/index';

@Injectable()
export class EventService {

    constructor() {
    }

    private selectedNeedSource = new Subject<Need>();

    selectedNeed$ = this.selectedNeedSource.asObservable();

    selectNeed(need:Need) {
        this.selectedNeedSource.next(need);
    }

}
