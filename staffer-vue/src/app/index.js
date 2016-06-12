import Vue from 'vue';
import './app.scss';
import store from '../store';
import NeedsFilter from '../needs-filter';
import NeedsTable from '../needs-table';
import PeopleTable from '../people-table';

export default Vue.extend({
    template: require('./app.html'),
    data: ()=>store,

    computed: {
        summary: ()=> store.summary,
    },

    components: {
        NeedsFilter,
        NeedsTable,
        PeopleTable
    },
});

