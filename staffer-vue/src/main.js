import Vue from 'vue';
import App from './app';
import store from './store';

/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: { App },
    data: store,
});


setTimeout(()=> {
    store.matchingNeeds.push({ personId: 123 });
}, 3000);
