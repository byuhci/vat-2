import { Component, OnInit, Inject } from '@angular/core';
import { OpaqueToken } from '@angular/core';

import { AppConfig, DEFAULT_CONFIG } from './app-config';

export let APP_CONFIG = new OpaqueToken('app.config');

@Component({
    selector: 'vat-nav-bar',
    templateUrl: 'app/nav-bar.component.html',
    providers: [{ provide: APP_CONFIG, useValue: DEFAULT_CONFIG }]
})
export class NavBarComponent implements OnInit {

    title: string;

    constructor(@Inject(APP_CONFIG) config: AppConfig) {
        this.title = config.title;
    }

    ngOnInit() { }

}