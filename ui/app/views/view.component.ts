import { Component, OnInit } from '@angular/core';
import { VideoUploaderComponent } from './center-pane/video-uploader.component';
import { SignalUploaderComponent } from './signal-pane/signal-uploader.component';

@Component({
    moduleId: module.id,
    selector: 'vat-view',
    templateUrl: 'view.component.html',
    styleUrls: ['view.component.css'],
    directives: [VideoUploaderComponent, SignalUploaderComponent]
})
export class ViewComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}