import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Data, Signal, Sensor, DisplaySignals } from './../../util/signal';
import { SignalConversionService } from './../../services/signals.service';
import { DisplaySignalService } from './../../services/display-signal.service';

@Component({
    moduleId: module.id,
    selector: 'vat-signal-filter',
    templateUrl: 'signal-filter-menu.component.html',
    styleUrls: ['signal-filter-menu.component.css']
})
export class SignalFilterMenuComponent implements OnInit {
    @Input() data: Data;
    sensors: Sensor[] = [];
    private _display: DisplaySignals;

    constructor(private converter: SignalConversionService, private displayService: DisplaySignalService) {
        this.displayService.displayed$.subscribe(
            display => {
                console.log('menu display', display);
                this._display = display;
            });
    }

    ngOnInit() {
        this.converter.dataToSensors(this.data)
            .then(sensors => this.sensors = sensors);
    }

    /**
     * Returns _display[sensor][sig], but does safe object-property checking
     *  in case display[sensor] doesn't currently exist.
     */
    check(sensor: string, sig: string): boolean {
        return (this._display[sensor] || {})[sig] || false;
    }
}