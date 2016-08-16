import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Project } from './../util/project';

@Injectable()
export class ProjectService {
    private projectsUrl = 'app/projects';

    constructor(private http: Http) { }
    
    getProjects() {
        return this.http.get(this.projectsUrl)
                .toPromise()
                .then(res => res.json().data as Project[])
                .catch(this.handleError);
    }

    private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}