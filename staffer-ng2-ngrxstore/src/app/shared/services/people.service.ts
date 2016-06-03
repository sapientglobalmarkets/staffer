import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { Need, Person } from '../models/index'
import { peopleUrl } from '../config/app.config';

@Injectable()
export class PeopleService {

    constructor(private http:Http) {
    }

    getPeople(need:Need):Observable<any> {

        let searchParams:URLSearchParams = new URLSearchParams();
        if (need) {
            searchParams.set('needId', need.id.toString());
            searchParams.set('skillId', need.skillId.toString());
            searchParams.set('availableFrom', need.startDate.toISOString());
            searchParams.set('availableTo', need.endDate.toISOString());
        }

        return this.http
            .get(peopleUrl, { search: searchParams })
            .map(response => this.extractData(response))
            .catch(this.handleError);
    }

    assign(person:Person, need:Need) {
        return this.http
            .post(peopleUrl + '/' + person.id + '/needs/' + need.id, '')
            .map(response => this.extractData(response))
            .catch(this.handleError);
    }

    unassign(person:Person, need:Need) {
        return this.http
            .delete(peopleUrl + '/' + person.id + '/needs/' + need.id)
            .map(response => this.extractData(response))
            .catch(this.handleError);
    }

    private extractData(response:Response) {
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Bad response status: ' + response.status);
        }

        let result = response.json();

        // If result has a needMap, convert ISO dates to Date objects
        // This is the case for assign and unassign results
        if (result.needMap) {
            _.each(result.needMap, function (need) {
                Need.parse(need);
            });
        }
        ;

        return result;
    }

    private handleError(errorResponse:Response) {
        let body = errorResponse.json();
        let message = body.message ?
            body.message :
            (errorResponse.statusText || 'unknown error');
        return Observable.throw(message);
    }
}
