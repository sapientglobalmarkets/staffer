import "whatwg-fetch";
import UrlSearchParams from "url-search-params";
import values from "lodash/values";

const HOST = 'http://localhost:8080';
const NEEDS_URL = `${HOST}/needs`;
const PEOPLE_URL = `${HOST}/people`;
const PROJECTS_URL = `${HOST}/projects`;
const SKILLS_URL = `${HOST}/skills`;

export default {

    title: 'Staffer - Vue',
    filter: {
        projectId: -1,
        skillId: -1,
        minStartDate: null,
        maxStartDate: null,
        statusId: 'open'
    },

    selectedNeed: null,
    matchingNeeds: [],
    matchingPeople: [],
    entityMap: {
        persons: {},
        skills: {},
        projects: {},
        statuses: {
            all: { id: 'all', name: 'All' },
            open: { id: 'open', name: 'Open' },
            closed: { id: 'closed', name: 'Closed' },
        },
    },

    get summary() {
        var closed = 0,
            open = 0,
            total = this.matchingNeeds.length;

        this.matchingNeeds.forEach(({ personId }) => {
            personId ? closed++ : open++;
        });

        return { open, closed, total };
    },


    setFilterField(key, value) {
        this.filter[ key ] = value;
    },

    init() {
        this.loadProjects();
        this.loadSkills();
        this.loadNeeds();
    },

    loadProjects() {
        fetch(PROJECTS_URL)
            .then(response=>response.json())
            .then(data=> {
                this.entityMap.projects = data;
            });
    },

    loadSkills() {
        fetch(SKILLS_URL)
            .then(response=>response.json())
            .then(data=> {
                this.entityMap.skills = data;
            });
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
            .then(({ needMap, personMap })=> {
                this.matchingPeople = [];
                this.matchingNeeds = values(needMap);
                this.entityMap.persons = Object.assign({}, this.entityMap.persons, personMap);

                // Pre-select on load
                this.selectNeed(this.matchingNeeds[ 0 ]);
            });
    },

    selectNeed(need) {
        this.selectedNeed = need;

        if (!need) {
            return;
        }

        const { id, skillId, startDate, endDate } = need;
        var search = new UrlSearchParams();
        search.set('needId', id);
        search.set('skillId', skillId);
        search.set('availableFrom', new Date(startDate));
        search.set('availableTo', new Date(endDate));

        fetch(`${PEOPLE_URL}?${search}`)
            .then(response=>response.json())
            .then(personMap=> {
                this.matchingPeople = values(personMap);
            });
    },

    updatePeopleAndNeed(need, { needMap, personMap }) {
        Object.assign(need, needMap[ need.id ]);

        this.entityMap.persons = Object.assign({}, this.entityMap.persons, personMap);
        values(personMap)
            .forEach(updatedPerson=> {
                let currentPerson = this.matchingPeople.find(x=>x.id === updatedPerson.id);
                Object.assign(currentPerson, updatedPerson);
            });
    },

    assignPerson(person, need) {
        fetch(`${PEOPLE_URL}/${person.id}/needs/${need.id}`, { method: 'post' })
            .then(response=>response.json())
            .then(this.updatePeopleAndNeed.bind(this, need));
    },

    unassignPerson(person, need) {
        fetch(`${PEOPLE_URL}/${person.id}/needs/${need.id}`, { method: 'delete' })
            .then(response=>response.json())
            .then(this.updatePeopleAndNeed.bind(this, need));
    },


};



function setIfValue(key, value, params) {
    if (!value || value === -1) {
        return;
    }

    params.set(key, value);
}

