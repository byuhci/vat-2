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
    _display;

    constructor(private displayService: DisplaySignalService,
                private conversionService: SignalConversionService) { }

    ngOnInit() {
        console.log('init widget');
        this.displayService.displayed$.subscribe(
            display => {
                this.conversionService.displayToSignals(display, this.data)
                    .then(signals => {
                        console.log('setting display signals', signals);
                        this.displaySignals = signals;
                    });
            });
        this.displayService.init();
        console.log('subscribed!', this.displaySignals);
    }
}