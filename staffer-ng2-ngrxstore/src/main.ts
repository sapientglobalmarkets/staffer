import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { StafferNg2AppComponent, environment } from './app/';
import { provideStore } from '@ngrx/store';
import { reducer, initialState } from './app/shared';

if (environment.production) {
    enableProdMode();
}

bootstrap(StafferNg2AppComponent, [
    provideStore(reducer, initialState)
]);
