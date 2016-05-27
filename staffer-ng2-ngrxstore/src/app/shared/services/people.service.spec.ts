import {
    beforeEachProviders,
    it,
    describe,
    expect,
    inject
} from '@angular/core/testing';
import { PeopleService } from './people.service';

describe('People Service', () => {
    beforeEachProviders(() => [PeopleService]);

    it('should ...',
        inject([PeopleService], (service: PeopleService) => {
            expect(service).toBeTruthy();
        }));
});
