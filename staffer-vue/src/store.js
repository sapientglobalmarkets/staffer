import 'whatwg-fetch';
import UrlSearchParams from 'url-search-params';
import values from 'lodash/values';

const HOST = 'http://localhost:8080';
const NEEDS_URL = `${HOST}/needs`;
// const PEOPLE_URL = `${HOST}/people`;
// const PROJECTS_URL = `${HOST}/projects`;
// const SKILLS_URL = `${HOST}/skills`;

export default {

    title: 'Staffer - Vue',
    filter: {},

    matchingNeeds: [],
    matchingPeople: [],
    entityMap: {
        persons: {},
        skills: {},
        projects: {},
    },

    loadNeeds() {
        const filter = this.filter;

        const params = new UrlSearchParams();
        setIfValue('projectId', filter.projectId, params);
        setIfValue('skillId', filter.skillId, params);
        setIfValue('minStartDate', filter.minStartDate, params);
        setIfValue('maxStartDate', filter.maxStartDate, params);
        setIfValue('status', filter.statusId, params);

        fetch(`${NEEDS_URL}?${params}`)
            .then(response=>response.json())
            .then(({ needMap, projectMap, personMap, skillMap })=> {
                this.matchingPeople = [];
                this.matchingNeeds = values(needMap);
                this.entityMap.persons.merge(personMap);

                // Pre-select on load
                this.selectNeed(this.matchingNeeds[ 0 ]);
            });
    },


};

function setIfValue(key, value, params) {
    if (!value || value === -1) {
        return;
    }

    params.set(key, value);
}
