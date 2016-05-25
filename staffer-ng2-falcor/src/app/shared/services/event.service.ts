import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { FalcorNeed } from '../models/index';

@Injectable()
export class EventService {

    constructor() {
    }

    private selectedNeedSource = new Subject<FalcorNeed>();

    selectedNeed$ = this.selectedNeedSource.asObservable();

    selectNeed(need: FalcorNeed) {
        this.selectedNeedSource.next(need);
    }

}
