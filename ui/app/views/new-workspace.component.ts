import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'vat-new-workspace',
    template: `<vat-view></vat-view>`
})
export class NewWorkspaceComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() { }
}