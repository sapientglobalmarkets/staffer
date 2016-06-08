import {observable, computed, action} from 'mobx';
import 'whatwg-fetch';

const HOST = 'http://localhost:8080';
const NEEDS_URL = `${HOST}/needs`;

class Store {
    @observable filter:{};
    @observable matchingNeeds = [];
    @observable matchingPeople = [];

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
    loadNeeds() {
        fetch(NEEDS_URL, {body: {status: 'all'}})
            .then(response=>response.json())
            .then(data=> {
                this.matchingNeeds = prepareNeeds(data);
            });
    }
}
let store = new Store();
setTimeout(()=>store.loadNeeds());

export default store;


import values from 'lodash/values';
function prepareNeeds({needMap, projectMap, personMap, skillMap}) {

    return values(needMap)
        .map(need=> {
            return {
                project: projectMap[need.projectId],
                skill: skillMap[need.skillId],
                person: need.personId ? personMap[need.personId] : null,
                ...need
            };
        });
}