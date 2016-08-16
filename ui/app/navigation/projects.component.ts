import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from './../util/project';
import { ProjectService } from './../services/projects.service';

@Component({
    moduleId: module.id,
    selector: 'vat-projects',
    templateUrl: 'projects.component.html',
    styleUrls: ['projects.component.css']
})
export class ProjectsComponent implements OnInit {
    projects: Project[] = [];

    constructor(private router: Router,
                private projectService: ProjectService) { }

    ngOnInit() {
        this.projectService.getProjects()
            .then(projects => this.projects = projects);
     }

}