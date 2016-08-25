import { Component, OnInit, Input } from '@angular/core';
import { Data, Signal } from './../../util/signal';

@Component({
    moduleId: module.id,
    selector: 'vat-signal-widget',
    templateUrl: 'signal-widget.component.html',
    styleUrls: ['signal-widget.component.css']
})
export class SignalWidgetComponent implements OnInit {
    @Input() data: Data;
    displaySignals: Signal[];

    constructor() { }

    ngOnInit() {
        this.displaySignals = this.getSignals();
    }

    private getSignals(): Signal[] {
        return this.data['A'].signals;
    }
}