import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'vat',
    template: `
        <h1>{{title}}</h1>
        <router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {
    title = 'VAT';
}