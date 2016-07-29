import { Component, OnInit } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileDropDirective, FileUploader} from 'ng2-file-upload/ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
    moduleId: module.id,
    selector: 'vat-video-upload',
    templateUrl: 'video-uploader.component.html',
    styleUrls: ['video-uploader.component.css'],
    directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class VideoUploaderComponent implements OnInit {

    public uploader:FileUploader = new FileUploader({url: URL});
    public hasBaseDropZoneOver:boolean = false;
    public hasAnotherDropZoneOver:boolean = false;

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e:any):void {
        this.hasAnotherDropZoneOver = e;
    }

    constructor() { }

    ngOnInit() { }

}