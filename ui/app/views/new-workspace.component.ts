import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ViewComponent } from './view.component';

@Component({
    moduleId: module.id,
    selector: 'vat-new-workspace',
    template: `<vat-view></vat-view>`,
    directives: [ViewComponent]
})
export class NewWorkspaceComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() { }

}