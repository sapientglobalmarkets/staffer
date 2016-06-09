import {observable, asMap, computed, action} from 'mobx';
import 'whatwg-fetch';
import UrlSearchParams from 'url-search-params';
import values from 'lodash/values';

const HOST = 'http://localhost:8080';
const NEEDS_URL = `${HOST}/needs`;
const PEOPLE_URL = `${HOST}/people`;

class Store {
    @observable filter = {
        minStartDate: null,
        maxStartDate: null,
        projectId: -1,
        skillId: -1,
        statusId: 'open'
    };
    @observable matchingNeeds = [];
    @observable matchingPeople = [];
    @observable selectedNeed = null;

    @observable entityMap = {
        projects: {},
        persons: asMap({}),
        skills: {},
        statuses: {
            all: {id: 'all', name: 'All'},
            open: {id: 'open', name: 'Open'},
            closed: {id: 'closed', name: 'Closed'},
        }
    };

    @computed get summary() {
        var closed = 0,
            open = 0,
            total = this.matchingNeeds.length;

        this.matchingNeeds.forEach(({personId}) => {
            personId ? closed++ : open++;
        });

        return {open, closed, total};
    }

    @action
    setFilterField(key, value) {
        this.filter[key] = value;
    }

    @action
    loadNeeds() {
        const filter = this.filter;

        var params = new UrlSearchParams();
        setIfValue('projectId', filter.projectId, params);
        setIfValue('skillId', filter.skillId, params);
        setIfValue('minStartDate', filter.minStartDate, params);
        setIfValue('maxStartDate', filter.maxStartDate, params);
        setIfValue('status', filter.statusId, params);

        fetch(`${NEEDS_URL}?${params}`)
            .then(response=>response.json())
            .then(({needMap, projectMap, personMap, skillMap})=> {
                this.matchingNeeds = values(needMap);

                this.entityMap.projects = projectMap;
                this.entityMap.skills = skillMap;
                this.entityMap.persons.merge(personMap);

                if (this.selectedNeed) {
                    this.selectedNeed = this.matchingNeeds.find(n=>n.id === this.selectedNeed.id);
                }
            });
    }

    @action
    selectNeed(need) {
        this.selectedNeed = need;

        const {id, skillId, startDate, endDate} = need;
        var search = new UrlSearchParams();
        search.set('needId', id);
        search.set('skillId', skillId);
        search.set('availableFrom', startDate);
        search.set('availableTo', endDate);

        fetch(`${PEOPLE_URL}?${search}`)
            .then(response=>response.json())
            .then(personMap=> {
                this.matchingPeople = values(personMap);
            });
    }

    updatePeopleAndNeed(need, {needMap, personMap}) {
        const needIndex = this.matchingNeeds.findIndex(n=>n.id === need.id);
        this.matchingNeeds[needIndex] = Object.assign(need, needMap[need.id]);

        this.entityMap.persons.merge(personMap);
        values(personMap)
            .forEach(updatedPerson=> {
                const index = this.matchingPeople.findIndex(x=>x.id === updatedPerson.id);
                const currentPerson = this.matchingPeople[index];
                this.matchingPeople[index] = Object.assign(currentPerson, updatedPerson);
            });
    }

    @action
    assignPerson(person, need) {
        fetch(`${PEOPLE_URL}/${person.id}/needs/${need.id}`, {method: 'post'})
            .then(response=>response.json())
            .then(this.updatePeopleAndNeed.bind(this, need));
    }

    @action
    unassignPerson(person, need) {
        fetch(`${PEOPLE_URL}/${person.id}/needs/${need.id}`, {method: 'delete'})
            .then(response=>response.json())
            .then(this.updatePeopleAndNeed.bind(this, need));
    }

}
let store = new Store();
setTimeout(()=>store.loadNeeds());

export default store;

function formatDate(dt) {
    const m = dt.getMonth() + 1;
    const d = dt.getDate();
    return `${dt.getFullYear()}-${pad(m)}-${pad(d)}`;
}

function pad(value) {
    return value < 10 ? ('0' + value) : value;
}

function setIfValue(key, value, params) {
    if (!value || value === -1) {
        return;
    }

    params.set(key, value);
}