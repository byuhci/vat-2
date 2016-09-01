import { SENSOR_NAMES, SIGNAL_DIM } from './signal-config';
declare var d3: any;

export class Sensor {
    name: string;
    fullName: string;
    _sigs: SignalDict;
    get signals(): Signal[] {return Object.keys(this._sigs).map(key => this._sigs[key]);}

    constructor(name: string) {
        this.name = name;
        this.fullName = SENSOR_NAMES[name];
        this._sigs = {};
    }

    getSignal(idx: number | string): Signal {
        if (typeof idx === "number" ) {
            idx = SIGNAL_DIM(this.name, idx as number);
        }
        if (!(idx in this._sigs)) {
            this._sigs[idx] = new Signal(this, idx as string);
        }
        return this._sigs[idx];
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
        for (let dim in this._sigs) {
            let signal = this._sigs[dim];
            let yExt = d3.extent(signal.readings, (r: Reading) => r.value);
            result.yMin = Math.min(result.yMin, yExt[0]);
            result.yMax = Math.max(result.yMax, yExt[1]);
        }
        return result;
    }
}

export class Signal {
    _sensor: Sensor;
    sensor: string;
    dim: string;
    readings: Reading[];
    get name(): string {return this.sensor + "--" + this.dim}

    constructor(sensor: Sensor, dim: string) {
        this._sensor = sensor;
        this.sensor = SENSOR_NAMES[sensor.name];
        this.dim = dim;
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

export interface SignalStatus {
    [index: string]: boolean;
}

export interface DisplaySignals {
    [index: string]: SignalStatus;
}
