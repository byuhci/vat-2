import { Component, OnInit } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import { SUPPORTED_FORMATS } from './video-config';

const MY_URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
    moduleId: module.id,
    selector: 'vat-video-upload',
    templateUrl: 'video-uploader.component.html',
    styleUrls: ['../dropzones.css', 'video-uploader.component.css']
})
export class VideoUploaderComponent implements OnInit {

    constructor(private sanitizer: DomSanitizationService) { }

    public uploader:FileUploader = new FileUploader({url: MY_URL});
    public hasBaseDropZoneOver:boolean = false;
    public video:File = undefined;
    private raw_videoUrl:string = undefined;
    private _videoUrl;
    public getVideoUrl() {
        if (!this._videoUrl) {
            console.log('getting url', this.raw_videoUrl);
            this._videoUrl = this.sanitizer.bypassSecurityTrustUrl(this.raw_videoUrl);
        }
        return this._videoUrl;
    }

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
        console.log('file over base', e);
    }

    public fileDrop(files:File[]):void {
        console.log('file dropped', files);
        for (var file of files) {
            if (SUPPORTED_FORMATS.includes(file.type)) {
                if (!this.video) {
                    this.video = file;
                    console.log('video is now set to:', this.video);
                    this.raw_videoUrl = URL.createObjectURL(file);
                }
                else {
                    console.warn('video has already been set, ignoring file:', file)
                }
            }
        }
    }

    ngOnInit() { }

}