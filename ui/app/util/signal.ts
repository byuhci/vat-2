import { SENSOR_NAMES, SIGNAL_DIM } from './signal-config';
declare var d3: any;

export class Sensor {
    name: string;
    fullName: string;
    signals: SignalDict;

    constructor(name: string) {
        this.name = name;
        this.fullName = SENSOR_NAMES[name];
        this.signals = {};
    }

    getSignal(idx: number): Signal {
        if (!(idx in this.signals)) {
            this.signals[idx] = new Signal(this.name, idx);
        }
        return this.signals[idx];
    }

    isMessage(): boolean {
        if (this.fullName === "syslog" || this.fullName === "error") {
            return true;
        }
        return false;
    }

    extents() {
        let firstSignal = this.signals[0];
        let result = {
            xMin: firstSignal.readings[0].tick,
            xMax: firstSignal.readings[firstSignal.readings.length-1].tick,
            yMin: 0,
            yMax: 0}
        for (let dim in this.signals) {
            let signal = this.signals[dim];
            let yExt = d3.extent(signal.readings, (r: Reading) => r.value);
            result.yMin = Math.min(result.yMin, yExt[0]);
            result.yMax = Math.max(result.yMax, yExt[1]);
        }
        return result;
    }
}

export class Signal {
    _sensor: string;
    sensor: string;
    dim: string;
    dimIdx: number;
    readings: Reading[];

    constructor(sensor: string, dimIdx: number) {
        this._sensor = sensor;
        this.sensor = SENSOR_NAMES[sensor];
        this.dimIdx = dimIdx;
        this.dim = SIGNAL_DIM(sensor, dimIdx);
        this.readings = [];
    }

    append(reading: Reading) {
        this.readings.push(reading);
    }
}

export interface Reading {
    tick: number;
    value: number | string;
    time?: number;
}

export interface SignalDict {
    [index: number]: Signal;
}

export interface Data {
    [index: string]: Sensor;
}