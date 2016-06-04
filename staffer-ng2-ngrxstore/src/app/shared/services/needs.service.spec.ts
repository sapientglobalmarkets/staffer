import {
    beforeEachProviders,
    it,
    describe,
    expect,
    inject
} from '@angular/core/testing';
import { NeedsService } from './needs.service';

describe('NeedsService Service', () => {
    beforeEachProviders(() => [ NeedsService ]);

    it('should ...',
        inject([ NeedsService ], (service:NeedsService) => {
            expect(service).toBeTruthy();
        }));
});
