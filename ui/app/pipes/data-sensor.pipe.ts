import { Pipe, PipeTransform } from '@angular/core';
import { Sensor } from './../util/signal';

@Pipe({
    name: 'dataSensor'
})

export class DataSensorPipe implements PipeTransform {
    transform(sensors: Sensor[]): Sensor[] {
        return sensors.filter(sensor => !sensor.isMessage());
    }
}