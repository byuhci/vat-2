import { Injectable } from '@angular/core';
import { DomSanitizationService, SafeUrl } from '@angular/platform-browser';


@Injectable()
export class SignalParseService {

    constructor(private sanitizer: DomSanitizationService) { }

    public parseCSV(file: File) {
        console.log('via FileReader', file);
        this.fileToString(file)
            .then(str => console.log('result', str))
            .catch(err => console.error('uh oh!', err));

    }

    private fileToString(file: File): Promise<any> {
        return new Promise((resolve,reject)=> {
            var reader = new FileReader();
            reader.onload = function(event: any) {
                var contents = event.target.result;
                resolve(contents);
            };

            reader.onerror = function(event: any) {
                console.error("File could not be read! Code " + event.target.error.code);
                reject(event.target.error);
            };

            reader.readAsText(file);
        });
    }
}