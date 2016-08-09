import { Component, OnInit, OnChanges, Input, ElementRef, NgZone } from '@angular/core';
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
    private x0Scale;     // Original scale for X
    private yScale;      // D3 scale in Y
    private xAxis;       // D3 X Axis
    private yAxis;       // D3 Y Axis
    private htmlElement; // Host HTMLElement
    private line;        // D3 Line
    private view;        // D3 View
    private gX;
    private gY;

    

    constructor(private element: ElementRef, private zone: NgZone) { 
        this.htmlElement = this.element.nativeElement;
        this.host = d3.select(this.element.nativeElement);
    }

    ngOnInit() { 
        console.log('received input', this.config);
    }

    /* Will Update on every @Input change */
    ngOnChanges() {
        console.log('registering changes');
        this.setup();
        this.buildSVG();
        this.populate();
        this.drawXAxis();
        this.drawYAxis();
        this.setupZoom();
    }

    ngDoCheck(d) {
        console.log("checking", d);
    }

    /* Will setup the chart container */
    private setup(): void {
        this.margin = { top: 20, right: 20, bottom: 40, left: 80 };
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientHeight - this.margin.top - this.margin.bottom;
        this.xScale = d3.scaleLinear().range([0, this.width]);
        this.x0Scale = d3.scaleLinear().range([0, this.width]);
        this.yScale = d3.scaleLinear().range([this.height, 0]);
        this.xAxis = d3.axisBottom(this.xScale);
        this.yAxis = d3.axisLeft(this.yScale);
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
        this.view = this.svg.append("rect")
            .attr("class", "view")
            .attr("x", 0.5)
            .attr("y", 0.5)
            .attr("width", this.width - 1)
            .attr("height", this.height - 1);
    }
    
    /* Will draw the X Axis */
    private drawXAxis(): void {
        
        this.gX = this.svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0, " + this.height + ")")
            .call(this.xAxis);   
    }
    
    /* Will draw the Y Axis */
    private drawYAxis(): void {
        this.gY = this.svg.append("g")
            .attr("class", "axis axis--y")
            .call(this.yAxis);
    }

    /* Will populate datasets into areas*/
    private populate(): void {
        this.config.forEach((signal: any) => {
            this.xScale.domain(d3.extent(signal.dataset, (d: any) => d.x));
            this.yScale.domain(d3.extent(signal.dataset, (d: any) => d.y));
            this.x0Scale.domain(this.xScale.domain());
            this.svg.append("path")
                .datum(signal.dataset)
                .attr("class", "line")
                .attr("d", this.line);
        });
    }

    private setupZoom(): void {
        console.log('setting up zoom', this.svg);
        this.svg.append("rect")
        .attr("class", "zoom")
        .attr("width", this.width)
        .attr("height", this.height)
        .style("pointer-events", "all")
        .call(
            d3.zoom()
            // .scaleExtent([1, 40])
            .translateExtent([-100, -100], [this.width + 90, this.height + 100])
            .on("zoom", () => {this.zoomed();}))
        .on("click", () => console.log("clicked!"));
    }

    public zoomed(): void {
        console.log('zoom');
        var t = d3.event.transform;

        this.xScale.domain(t.rescaleX(this.x0Scale).domain());
        this.svg.select(".line").attr("d", this.line);
        this.svg.select(".axis--x").call(this.xAxis);
        // this.view.attr('transform', d3.event.transform);
        // this.svg.select('path').attr('transform', d3.event.transform);
        // this.gX.call(this.xAxis.scale(d3.event.transform.rescaleX(this.xScale)));
        //this.gY.call(this.yAxis.scale(d3.event.transform.rescaleY(this.yScale)));
    }

    public whee(): void {
        console.log('you clicked me!');
    }

}