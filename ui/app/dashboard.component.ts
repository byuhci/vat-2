import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'vat-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() { }

    navigate(dest: string) {
        let link = ['/' + dest];
        this.router.navigate(link);
    }
}