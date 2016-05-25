import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { FalcorService } from './falcor.service';
import { needsUrl } from '../config/app.config';
import { FilterState, FalcorNeed, Need } from '../models/index'

@Injectable()
export class NeedsService {

    constructor(private falcorService: FalcorService, private http: Http) {
    }

    getNeeds(filterState: FilterState): Observable<any> {

        let searchParams: URLSearchParams = new URLSearchParams();
        if (filterState.minStartDate) {
            searchParams.set('minStartDate', filterState.minStartDate);
        }
        if (filterState.maxStartDate) {
            searchParams.set('maxStartDate', filterState.maxStartDate);
        }
        if (filterState.projectId > -1) {
            searchParams.set('projectId', filterState.projectId.toString());
        }
        if (filterState.skillId > -1) {
            searchParams.set('skillId', filterState.skillId.toString());
        }
        if (filterState.status !== 'all') {
            searchParams.set('status', filterState.status);
        }

        return this.http
            .get(needsUrl, { search: searchParams })
            .map(response => this.extractData(response))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Bad response status: ' + response.status);
        }

        let result = response.json();

        // Convert ISO dates to Date objects
        _.each(result.needMap, function(need) {
            Need.parse(need);
        });

        return result;
    }

    private handleError(errorResponse: Response) {
        let body = errorResponse.json();
        let message = body.message ?
            body.message :
            (errorResponse.statusText || 'unknown error');
        return Observable.throw(message);
    }

    getFalcorNeeds(filterState: FilterState): Promise<FalcorNeed[]> {
        return this.falcorService.get([
                'needs',
                {from: 0, to: 100},
                ['id', 'startDate', 'endDate', 'project', 'skill', 'person'],
                ['id', 'name', 'email', 'phone']
            ])
        .then((response) => {
            return _.map(response.json.needs, (need: any) => {
                return {
                    id: need.id,
                    startDate: new Date(need.startDate),
                    endDate: new Date(need.endDate),
                    projectId: need.project.id,
                    projectName: need.project.name,
                    skillId: need.skill.id,
                    skillName: need.skill.name,
                    personId: need.person ? need.person.id : null,
                    personName: need.person ? need.person.name : null
                } as FalcorNeed;
            });
        });
    }

}
