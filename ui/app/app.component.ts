import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'vat',
    template: `
        <vat-nav-bar [title]="title"></vat-nav-bar>
        <router-outlet></router-outlet>`
})
export class AppComponent {
    title = 'VAT';
}