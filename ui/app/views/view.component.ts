import { Component, OnInit } from '@angular/core';
import { VideoUploaderComponent } from './signal-pane/video-uploader.component';

@Component({
    moduleId: module.id,
    selector: 'vat-view',
    templateUrl: 'view.component.html',
    styleUrls: ['view.component.css'],
    directives: [VideoUploaderComponent]
})
export class ViewComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}