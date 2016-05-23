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
import { NeedsPanelComponent } from './needs-panel.component';

describe('Component: NeedsPanel', () => {
    let builder: TestComponentBuilder;

    beforeEachProviders(() => [NeedsPanelComponent]);
    beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
        builder = tcb;
    }));

    it('should inject the component', inject([NeedsPanelComponent],
        (component: NeedsPanelComponent) => {
            expect(component).toBeTruthy();
        }));

    it('should create the component', inject([], () => {
        return builder.createAsync(NeedsPanelComponentTestController)
            .then((fixture: ComponentFixture<any>) => {
                let query = fixture.debugElement.query(By.directive(NeedsPanelComponent));
                expect(query).toBeTruthy();
                expect(query.componentInstance).toBeTruthy();
            });
    }));
});

@Component({
    selector: 'test',
    template: `
    <app-needs-panel></app-needs-panel>
  `,
    directives: [NeedsPanelComponent]
})
class NeedsPanelComponentTestController {
}

