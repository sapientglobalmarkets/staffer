import {
    beforeEach,
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
} from '@angular/core/testing';
import {
    ComponentFixture,
    TestComponentBuilder
} from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PeoplePanelComponent } from './people-panel.component';

describe('Component: PeoplePanel', () => {
    let builder:TestComponentBuilder;

    beforeEachProviders(() => [ PeoplePanelComponent ]);
    beforeEach(inject([ TestComponentBuilder ], function (tcb:TestComponentBuilder) {
        builder = tcb;
    }));

    it('should inject the component', inject([ PeoplePanelComponent ],
        (component:PeoplePanelComponent) => {
            expect(component).toBeTruthy();
        }));

    it('should create the component', inject([], () => {
        return builder.createAsync(PeoplePanelComponentTestController)
            .then((fixture:ComponentFixture<any>) => {
                let query = fixture.debugElement.query(By.directive(PeoplePanelComponent));
                expect(query).toBeTruthy();
                expect(query.componentInstance).toBeTruthy();
            });
    }));
});

@Component({
    selector: 'test',
    template: `
    <app-people-panel></app-people-panel>
  `,
    directives: [ PeoplePanelComponent ]
})
class PeoplePanelComponentTestController {
}

