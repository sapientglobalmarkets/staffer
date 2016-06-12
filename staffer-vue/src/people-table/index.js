import './people-table.scss';
import Vue from 'vue';
import store from '../store';
import includes from 'lodash/includes';

const Person = Vue.extend({
    template: require('./person.html'),
    props: {
        person: Object,
        selected: Boolean
    },

    methods: {
        notify: function (event) {
            this.$dispatch('assign', this.person, event.target.checked)
        }
    }
});

export default Vue.extend({
    data: ()=>store,

    template: require('./people-table.html'),
    components: {
        Person
    },

    methods: {
        isAssigned(person) {
            return includes(person.needIds, this.selectedNeed.id);
        },

        onAssign(person, assigned) {
            if (assigned) {
                store.assignPerson(person, this.selectedNeed);
            } else {
                store.unassignPerson(person, this.selectedNeed);
            }
        }
    }
});
