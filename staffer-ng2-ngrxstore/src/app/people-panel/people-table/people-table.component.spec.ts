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
import { PeopleTableComponent } from './people-table.component';

describe('Component: PeopleTable', () => {
    let builder:TestComponentBuilder;

    beforeEachProviders(() => [ PeopleTableComponent ]);
    beforeEach(inject([ TestComponentBuilder ], function (tcb:TestComponentBuilder) {
        builder = tcb;
    }));

    it('should inject the component', inject([ PeopleTableComponent ],
        (component:PeopleTableComponent) => {
            expect(component).toBeTruthy();
        }));

    it('should create the component', inject([], () => {
        return builder.createAsync(PeopleTableComponentTestController)
            .then((fixture:ComponentFixture<any>) => {
                let query = fixture.debugElement.query(By.directive(PeopleTableComponent));
                expect(query).toBeTruthy();
                expect(query.componentInstance).toBeTruthy();
            });
    }));
});

@Component({
    selector: 'test',
    template: `
    <app-people-table></app-people-table>
  `,
    directives: [ PeopleTableComponent ]
})
class PeopleTableComponentTestController {
}

