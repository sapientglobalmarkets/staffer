import {
    beforeEachProviders,
    it,
    describe,
    expect,
    inject
} from '@angular/core/testing';
import { ProjectsService } from './projects.service';

describe('Projects Service', () => {
    beforeEachProviders(() => [ProjectsService]);

    it('should ...',
        inject([ProjectsService], (service: ProjectsService) => {
            expect(service).toBeTruthy();
        }));
});
