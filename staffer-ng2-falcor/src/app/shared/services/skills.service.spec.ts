import {
    beforeEachProviders,
    it,
    describe,
    expect,
    inject
} from '@angular/core/testing';
import { SkillsService } from './skills.service';

describe('SkillsService Service', () => {
    beforeEachProviders(() => [SkillsService]);

    it('should ...',
        inject([SkillsService], (service: SkillsService) => {
            expect(service).toBeTruthy();
        }));
});
