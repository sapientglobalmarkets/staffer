import {
    beforeEach,
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NeedsFilterComponent } from './needs-filter.component';

describe('Component: NeedsFilter', () => {
    let builder: TestComponentBuilder;

    beforeEachProviders(() => [NeedsFilterComponent]);
    beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
        builder = tcb;
    }));

    it('should inject the component', inject([NeedsFilterComponent],
        (component: NeedsFilterComponent) => {
            expect(component).toBeTruthy();
        }));

    it('should create the component', inject([], () => {
        return builder.createAsync(NeedsFilterComponentTestController)
            .then((fixture: ComponentFixture<any>) => {
                let query = fixture.debugElement.query(By.directive(NeedsFilterComponent));
                expect(query).toBeTruthy();
                expect(query.componentInstance).toBeTruthy();
            });
    }));
});

@Component({
    selector: 'test',
    template: `
    <app-needs-filter></app-needs-filter>
  `,
    directives: [NeedsFilterComponent]
})
class NeedsFilterComponentTestController {
}

