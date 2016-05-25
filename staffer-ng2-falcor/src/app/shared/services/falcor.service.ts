import { Injectable } from '@angular/core';

import { falcorModelUrl } from '../config/app.config';

// Falcor has been included as an external JavaScript library
declare var falcor: any;

@Injectable()
export class FalcorService {

    model: any;

    constructor() {
        this.model = new falcor.Model({
            source: new falcor.HttpDataSource(falcorModelUrl)
        });
    }

    get(path: any[]): Promise<any> {
        return this.model.get(path);
    }
}
