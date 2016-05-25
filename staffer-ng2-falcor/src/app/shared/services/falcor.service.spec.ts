import {
    beforeEachProviders,
    it,
    describe,
    expect,
    inject
} from '@angular/core/testing';
import { FalcorService } from './falcor.service';

describe('Falcor Service', () => {
    beforeEachProviders(() => [FalcorService]);

    it('should ...',
        inject([FalcorService], (service: FalcorService) => {
            expect(service).toBeTruthy();
        }));
});
