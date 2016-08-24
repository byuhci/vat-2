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
        let result: Signal[] = [];
        // TODO: don't hard-code signals!
        let signals = this.data['A'].signals;
        for (let dim in signals) {
            result.push(signals[dim]);
        }
        return result;
    }
}