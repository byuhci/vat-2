import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { NavBarComponent } from './nav-bar.component';

@Component({
    moduleId: module.id,
    selector: 'vat',
    template: `
        <vat-nav-bar></vat-nav-bar>
        <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES, NavBarComponent]
})

export class AppComponent {
    title = 'VAT';
}