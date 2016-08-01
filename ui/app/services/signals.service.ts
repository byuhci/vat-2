import { Injectable } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';

@Injectable()
export class SignalParseService {

    constructor(private sanitizer: DomSanitizationService) { }

    public parseCSV(file: File) {
        this.toURL(file)
            .then(url => console.log('csv url', url));
    }

    private toURL(file: File) {
        let rawUrl = URL.createObjectURL(file);
        return Promise.resolve(this.sanitizer.bypassSecurityTrustUrl(rawUrl));
    }

}