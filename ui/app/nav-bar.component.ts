import { Component, OnInit, Inject, Input } from '@angular/core';
import { OpaqueToken } from '@angular/core';

import { AppConfig, DEFAULT_CONFIG, APP_CONFIG} from './app-config';



@Component({
    moduleId: module.id,
    selector: 'vat-nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: ['nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    @Input() title: string;

    constructor() { }

    ngOnInit() { }

}