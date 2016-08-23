import { Component, OnInit, Input } from '@angular/core';
import { Data } from './../../util/signal';

@Component({
    moduleId: module.id,
    selector: 'vat-signal-widget',
    templateUrl: 'signal-widget.component.html'
})
export class SignalWidgetComponent implements OnInit {
    @Input() data: Data;

    constructor() { }

    ngOnInit() { }
}