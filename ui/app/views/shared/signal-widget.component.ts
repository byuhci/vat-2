import { Component, OnInit, OnChanges, Input, ElementRef } from '@angular/core';
import { SignalWidgetConfig } from './widget-config';
declare var d3: any;

@Component({
    moduleId: module.id,
    selector: 'vat-signal',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./signal-wdiget.component.css'],
    directives: []
})
export class SignalWidgetComponent implements OnInit, OnChanges {

    @Input() config: Array<SignalWidgetConfig>;

    private host;        // D3 object referencing host dom object
    private svg;         // SVG in which we will print our chart
    private margin;      // Space between the svg borders and the actual chart graphic
    private width;       // Component width
    private height;      // Component height
    private xScale;      // D3 scale in X
    private yScale;      // D3 scale in Y
    private xAxis;       // D3 X Axis
    private yAxis;       // D3 Y Axis
    private htmlElement; // Host HTMLElement
    private line;

    

    constructor(private element: ElementRef) { 
        this.htmlElement = this.element.nativeElement;
        this.host = d3.select(this.element.nativeElement);
    }

    ngOnInit() { 
        console.log('received input', this.config);
    }

    /* Will Update on every @Input change */
    ngOnChanges() {
        this.setup();
        this.buildSVG();
        this.populate();
        this.drawXAxis();
    }

    /* Will setup the chart container */
    private setup(): void {
        this.margin = { top: 20, right: 20, bottom: 40, left: 40 };
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientHeight - this.margin.top - this.margin.bottom;
        this.xScale = d3.scaleLinear().range([0, this.width]);
        this.yScale = d3.scaleLinear().range([this.height, 0]);
        this.line = d3.line()
            .x((d: any) => this.xScale(d.x))
            .y((d: any) => this.yScale(d.y));
        console.log('setup complete', this.width, this.height, this.htmlElement);
    }
    
    /* Will build the SVG Element */
    private buildSVG(): void {
        this.host.html('');
        this.svg = this.host.append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }
    
    /* Will draw the X Axis */
    private drawXAxis(): void {
        this.svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0, " + this.height + ")")
            .call(d3.axisBottom(this.xScale));
    }
    
    /* Will draw the Y Axis */
    private drawYAxis(): void {}

    /* Will populate datasets into areas*/
    private populate(): void {
        this.config.forEach((signal: any) => {
            this.xScale.domain(d3.extent(signal.dataset, (d: any) => d.x));
            this.yScale.domain(d3.extent(signal.dataset, (d: any) => d.y));
            this.svg.append("path")
                .datum(signal.dataset)
                .attr("class", "line")
                .attr("d", this.line);
        });
    }

}