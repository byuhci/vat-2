import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DisplaySignals } from './../util/signal';


@Injectable()
export class DisplaySignalService {

    constructor() { }

    // Observable sources
    private displaySource = new Subject<DisplaySignals>();

    // Observable streams
    displayed$ = this.displaySource.asObservable();
}