import { Component, OnInit, Input } from '@angular/core';
import { Data, Signal, DisplaySignals, SignalStatus } from './../../util/signal';
import { DisplaySignalService } from './../../services/display-signal.service';
import { SignalConversionService } from './../../services/signals.service';

@Component({
    moduleId: module.id,
    selector: 'vat-signal-widget',
    templateUrl: 'signal-widget.component.html',
    styleUrls: ['signal-widget.component.css']
})
export class SignalWidgetComponent implements OnInit {
    @Input() data: Data;
    displaySignals: Signal[];

    constructor(private displayService: DisplaySignalService,
                private conversionService: SignalConversionService) {
        //displayService.displayed$.subscribe
    }

    ngOnInit() {
        this.displaySignals = this.getSignals();
        let defaultDisplay: DisplaySignals = {"A": {"x": true, "y": true, "z": true}, "G": {"x": false, "y": false}};
        let sug = this.conversionService.displayToSignals(defaultDisplay, this.data);
        sug.then(result => console.log("suggested signals", result));
    }

    private getSignals(): Signal[] {
        return this.data['A'].signals; 
    }
}