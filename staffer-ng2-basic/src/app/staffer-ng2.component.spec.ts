import {
    beforeEachProviders,
    describe,
    expect,
    it,
    inject
} from '@angular/core/testing';
import { StafferNg2AppComponent } from '../app/staffer-ng2.component';

beforeEachProviders(() => [StafferNg2AppComponent]);

describe('App: StafferNg2', () => {
    it('should create the app',
        inject([StafferNg2AppComponent], (app: StafferNg2AppComponent) => {
            expect(app).toBeTruthy();
        }));

    it('should have as title \'Staffer\'',
        inject([StafferNg2AppComponent], (app: StafferNg2AppComponent) => {
            expect(app.title).toEqual('Staffer');
        }));
});
