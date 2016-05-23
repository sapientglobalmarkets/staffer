import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provider } from 'ng2-redux';

import { StafferNg2AppComponent, environment } from './app/';
import { createStoreInstance } from './app/shared/store/app.store';

if (environment.production) {
    enableProdMode();
}

const store = createStoreInstance();

bootstrap(StafferNg2AppComponent, [provider(store)]);
