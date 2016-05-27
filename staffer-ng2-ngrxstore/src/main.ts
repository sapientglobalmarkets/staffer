import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { StafferNg2AppComponent, environment } from './app/';

if (environment.production) {
    enableProdMode();
}

bootstrap(StafferNg2AppComponent);
