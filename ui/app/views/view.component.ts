import { Component, OnInit } from '@angular/core';
import { VideoUploaderComponent } from './signal-pane/video-uploader.component';

@Component({
    selector: 'vat-view',
    templateUrl: 'app/views/view.component.html',
    styleUrls: ['app/views/view.component.css'],
    directives: [VideoUploaderComponent]
})
export class ViewComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}