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
                console.debug('menu display', display);
                this._display = display;
            });
    }

    ngOnInit() {
        this.converter.dataToSensors(this.data)
            .then(sensors => this.sensors = sensors);
    }

    /**
     * Checks whether or not the check box should be displayed according to the signals model.
     * 
     * @returns {boolean} Returns _display[sensor][sig],
     *  but with safe object-property checking in case display[sensor] doesn't currently exist.
     */
    check(sensor: string, sig: string): boolean {
        return (this._display[sensor] || {})[sig] || false;
    }

    /**
     * Updates the display model observable with the new changes.
     */
    checkChange(sensor: string, sig: string, event: any) {
        if (!this._display[sensor]) {
            this._display[sensor] = {}
        }
        let checked = event.target.checked;
        console.debug(sensor, sig, checked);
        this._display[sensor][sig] = checked;
        this.displayService.update(this._display);
    }
}