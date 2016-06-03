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
import { NeedsTableComponent } from './needs-table.component';

describe('Component: NeedsTable', () => {
    let builder:TestComponentBuilder;

    beforeEachProviders(() => [ NeedsTableComponent ]);
    beforeEach(inject([ TestComponentBuilder ], function (tcb:TestComponentBuilder) {
        builder = tcb;
    }));

    it('should inject the component', inject([ NeedsTableComponent ],
        (component:NeedsTableComponent) => {
            expect(component).toBeTruthy();
        }));

    it('should create the component', inject([], () => {
        return builder.createAsync(NeedsTableComponentTestController)
            .then((fixture:ComponentFixture<any>) => {
                let query = fixture.debugElement.query(By.directive(NeedsTableComponent));
                expect(query).toBeTruthy();
                expect(query.componentInstance).toBeTruthy();
            });
    }));
});

@Component({
    selector: 'test',
    template: `
    <app-needs-table></app-needs-table>
  `,
    directives: [ NeedsTableComponent ]
})
class NeedsTableComponentTestController {
}

