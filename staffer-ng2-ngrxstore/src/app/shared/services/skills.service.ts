import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { skillsUrl } from '../config/app.config';

@Injectable()
export class SkillsService {

    constructor(private http: Http) {
    }

    getSkills(): Observable<any> {
        return this.http
            .get(skillsUrl)
            .map(response => this.extractData(response))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Bad response status: ' + response.status);
        }
        return response.json();
    }

    private handleError(errorResponse: Response) {
        let body = errorResponse.json();
        let message = body.message ?
            body.message :
            (errorResponse.statusText || 'unknown error');
        return Observable.throw(message);
    }
}
