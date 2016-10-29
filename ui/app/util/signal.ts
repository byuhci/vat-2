import { SENSOR_NAMES, SIGNAL_DIM } from './signal-config';
declare var d3: any;

export class Sensor {
    name: string;
    fullName: string;
    _sigs: SignalDict;
    get signals(): Signal[] { return Object.keys(this._sigs).map(key => this._sigs[key]); }
    get isMessage(): boolean { return (this.fullName === "syslog" || this.fullName === "error"); }

    constructor(name: string) {
        this.name = name;
        this.fullName = SENSOR_NAMES[name];
        this._sigs = {};
    }

    getSignal(signal: number | string): Signal {
        if (typeof signal === "number" ) {
            signal = SIGNAL_DIM(this.name, signal as number);
        }
        if (!(signal in this._sigs)) {
            this._sigs[signal] = new Signal(this, signal as string);
        }
        return this._sigs[signal];
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

    append(reading: Reading, signal: number | string) {
        this.getSignal(signal).append(reading);
    }
}

export class Syslog extends Sensor {

    private FLASHES = SIGNAL_DIM('S', 1);

    constructor() {
        super('S');
    }

    get firstRedFlash(): Reading { return this.getSignal(this.FLASHES).readings[0]; }
    get flashes(): Signal { return this.getSignal(this.FLASHES); }
    get isMessage(): boolean { return true; }

    append(reading: Reading, signal: number | string) {
        if (reading.value === "LED Sync") {
            signal = this.FLASHES;
        }
        super.append(reading, signal);
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
    [index: string]: Signal;
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
