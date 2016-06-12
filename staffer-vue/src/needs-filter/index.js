import './needs-filter.scss';
import Vue from 'vue';
import store from '../store';

export default Vue.extend({
    template: require('./needs-filter.html'),
    data: ()=> {
        const { entityMap, filter } = store;

        return {
            entities: entityMap,
            filter,
        };
    },

    methods: {
        notifyFilterChange(){
            store.loadNeeds();
        },
    }
});
