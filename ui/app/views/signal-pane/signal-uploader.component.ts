import { Component, OnInit } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileDropDirective, FileUploader} from 'ng2-file-upload/ng2-file-upload';
import { SignalParseService } from '../../services/signals.service';
import { SignalBarComponent } from '../shared/signal-bar.component';

const MY_URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
    moduleId: module.id,
    selector: 'vat-signal-upload',
    templateUrl: 'signal-uploader.component.html',
    styleUrls: ['../dropzones.css'],
    directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES, SignalBarComponent],
    providers: [SignalParseService]
})
export class SignalUploaderComponent implements OnInit {
    constructor(private parser: SignalParseService) { }

    public uploader:FileUploader = new FileUploader({url: MY_URL});
    public hasBaseDropZoneOver:boolean = false;
    public signals;
    public _id = 0;

    ngOnInit() { }

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
        console.log('file over base', e);
    }

    public fileDrop(files:File[]):void {
        console.log('file dropped', files);
        for (var file of files) {
            if (file.type === "text/csv") {
                console.log('found csv file', file);
                this.parser.parseCSV(file)
                    .then(signals => this.signals = signals)
                    .catch(err => console.log('uh oh, an error!', err));
            }
            else {
                console.warn('unsupported file', file);
            }
        }
    }

}