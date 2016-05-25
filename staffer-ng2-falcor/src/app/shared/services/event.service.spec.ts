import {
    beforeEachProviders,
    it,
    describe,
    expect,
    inject
} from '@angular/core/testing';
import { EventService } from './event.service';

describe('Event Service', () => {
    beforeEachProviders(() => [EventService]);

    it('should ...',
        inject([EventService], (service: EventService) => {
            expect(service).toBeTruthy();
        }));
});
