import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Data, Signal, Sensor } from './../../util/signal';
import { SignalConversionService } from './../../services/signals.service';

@Component({
    moduleId: module.id,
    selector: 'vat-signal-filter',
    templateUrl: 'signal-filter-menu.component.html',
    styleUrls: ['signal-filter-menu.component.css']
})
export class SignalFilterMenuComponent implements OnChanges {
    @Input() data: Data;
    sensors: Sensor[];

    constructor(private converter: SignalConversionService) { }

    ngOnChanges() {
        this.converter.dataToSensors(this.data)
            .then(sensors => this.sensors = sensors);
    }
}