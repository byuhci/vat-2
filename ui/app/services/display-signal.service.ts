import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DisplaySignals } from './../util/signal';


@Injectable()
export class DisplaySignalService {

    DEFAULT_DISPLAY: DisplaySignals = {"A": {"x": true, "y": true, "z": true}}

    constructor() { }

    // Observable sources
    private displaySource = new Subject<DisplaySignals>();

    // Observable streams
    displayed$ = this.displaySource.asObservable();

    // Updating function
    update(signals: DisplaySignals) {
        console.log('updating display signals', signals);
        this.displaySource.next(signals);
    }

    init(){
        this.update(this.DEFAULT_DISPLAY);
    }
}