import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'vat-video',
    templateUrl: 'video.component.html',
    styleUrls: ['video.component.css']
})
export class VideoComponent implements OnInit {
    @Input() source: string;

    private video: HTMLVideoElement;
    private root: HTMLElement;

    constructor(private element: ElementRef) { 
        this.root = this.element.nativeElement as HTMLElement;
        
    }

    ngOnInit() {
        this.video = this.root.firstChild as HTMLVideoElement;
        console.log("init vat video component", this.video);
    }

    update(e: Event) {
        let v = e.target as HTMLVideoElement;
        console.log("time updated", v.currentTime);
    }
}