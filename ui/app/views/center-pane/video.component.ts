import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'vat-video',
    templateUrl: 'video.component.html',
    styleUrls: ['video.component.css']
})
export class VideoComponent implements OnInit {
    @Input() source: string;

    constructor() { }

    ngOnInit() { 
        console.log("init vat video component");
    }
}