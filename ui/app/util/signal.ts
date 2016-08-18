import { SIGNAL_NAMES } from './signals-config';

export class Sensor {
    name: string;
    fullName: string;
    signals: SignalDict;

    constructor(name: string) {
        this.name = name;
        this.fullName = SIGNAL_NAMES[name];
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
}

export interface SignalDict {
    [index: number]: Signal;
}

export interface Data {
    [index: string]: Sensor;
}

export class Signal {
    sensor: string;
    dimIdx: number;
    readings: Reading[];

    constructor(sensor: string, dimIdx: number) {
        this.sensor = sensor;
        this.dimIdx = dimIdx;
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