import './needs-table.scss';
import Vue from 'vue';
import store from '../store';
import formatDate from '../format-date';

const NeedView = Vue.extend({
    template: require('./need.html'),
    props: {
        need: Object,
        selected: Boolean
    },

    methods: {
        notify: function(){
            this.$dispatch('assign', this.need.id);
        }
    }
});

export default Vue.extend({
    template: require('./needs-table.html'),
    data: ()=> store,
    components: {
        NeedView
    },
    methods: {
        prepareNeed({ id, projectId, skillId, personId, startDate, endDate }) {
            return {
                id,
                project: this.entityMap.projects[ projectId ].name,
                skill: this.entityMap.skills[ skillId ].name,
                person: personId ? this.entityMap.persons[ personId ].name : '',
                startDate: formatDate(new Date(startDate)),
                endDate: formatDate(new Date(endDate))
            };
        },

        isSelected({id}) {
            return (this.selectedNeed && this.selectedNeed.id === id);
        },

        notifySelectedNeed(needId) {
            const need = this.matchingNeeds.find(n=>n.id === needId);
            store.selectNeed(need);
        }
    },
});
