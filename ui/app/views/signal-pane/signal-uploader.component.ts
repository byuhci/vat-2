import { Component, OnInit } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileDropDirective, FileUploader} from 'ng2-file-upload/ng2-file-upload';
import { SignalParseService } from '../../services/signals.service';
import { SignalWidgetComponent } from '../shared/signal-widget.component';
import { SignalWidgetConfig } from '../shared/widget-config';

const MY_URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
    moduleId: module.id,
    selector: 'vat-signal-upload',
    templateUrl: 'signal-uploader.component.html',
    styleUrls: ['../dropzones.css'],
    directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES, SignalWidgetComponent],
    providers: [SignalParseService]
})
export class SignalUploaderComponent implements OnInit {
    constructor(private parser: SignalParseService) { }

    public uploader:FileUploader = new FileUploader({url: MY_URL});
    public hasBaseDropZoneOver:boolean = false;
    public signals;
    public _id = 0;
    public config;

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
                    .then(signals => this.config = this.toConfigArray(signals))
                    .catch(err => console.log('uh oh, an error!', err));
            }
            else {
                console.warn('unsupported file', file);
            }
        }
    }

    private toConfigArray(signals): Array<SignalWidgetConfig> {
        // TODO: temporarily we will only use the first dimension of the Accelerometer
        let d1 = signals['A'];
        let config = this.signalConfig(d1);

        return [config];
    }

    private signalConfig(signal): SignalWidgetConfig {
        console.log('converting to config');
        let config = new SignalWidgetConfig();
        config.settings = {
            fill: 'rgba(195, 0, 47, 1)',
            interpolation: 'monotone'
        };
        config.dataset = signal.map(data => {
            return { x: data.tick, y: +data.dimensions[0]};
        });
        console.log('config', config);
        return config;
    }

}