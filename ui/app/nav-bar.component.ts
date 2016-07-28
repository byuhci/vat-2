import { Component, OnInit, Inject, Input } from '@angular/core';
import { OpaqueToken } from '@angular/core';

import { AppConfig, DEFAULT_CONFIG, APP_CONFIG} from './app-config';



@Component({
    selector: 'vat-nav-bar',
    templateUrl: 'app/nav-bar.component.html',
    styleUrls: ['app/nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    @Input() title: string;

    constructor() { }

    ngOnInit() { }

}