import Vue from 'vue';
import './app.scss';
import store from '../store';

export default Vue.extend({
    template: require('./app.html'),
    data: ()=>store,

    computed: {
        summary: ()=> ({
            open: store.matchingNeeds.filter(x=>!x.personId).length,
            closed: store.matchingNeeds.filter(x=>x.personId).length,
            total: store.matchingNeeds.length,
        }),
    },
});

