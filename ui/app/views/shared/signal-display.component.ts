import { Component, OnInit, OnChanges, Input, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data } from './../../util/signal';
declare var d3: any;

@Component({
    moduleId: module.id,
    selector: 'vat-signal',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./signal-display.component.css']
})
export class SignalDisplayComponent implements OnInit, OnChanges {

    @Input() data: Data;
    displaySensors = ['A'];

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
    private view;        // View Container for the chart
    private paths;       // Container for all line paths
    private url;         // The relative url path from root
    

    constructor(private element: ElementRef, private route: ActivatedRoute) { 
        this.htmlElement = this.element.nativeElement;
        this.host = d3.select(this.element.nativeElement);
    }

    ngOnInit() { 
        console.log('received input', this.data);
    }

    /* Will Update on every @Input change */
    ngOnChanges() {
        console.log('registering changes');
        this.setUrl();
        this.setup();
        this.buildSVG();
        this.populate();
        this.drawXAxis();
        this.drawYAxis();
        this.setupZoom();
    }

    /* TODO: This is a hack! Try to find some other way around this problem. */
    private setUrl(): void {
        if (!this.url) {
            this.url = "";
            this.route.url.forEach(path => {
                path.forEach(part => {
                    this.url += "/" + part.path;
                });
            });
            console.log('set url', this.url);
        }
    }

    /* Sets up the chart container */
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
            .x((d: any) => this.xScale(d.tick))
            .y((d: any) => this.yScale(d.value));
        console.log('setup complete', this.width, this.height, this.htmlElement);
    }
    
    /* Builds the SVG Element */
    private buildSVG(): void {
        this.host.html('');
        this.svg = this.host.append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
        this.svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", this.width - 1)
            .attr("height", this.height - 1);
        this.view = this.svg.append("rect")
            .attr("class", "view")
            .attr("x", 0.5)
            .attr("y", 0.5)
            .attr("width", this.width - 1)
            .attr("height", this.height - 1);
    }
    
    /* Draws the X Axis */
    private drawXAxis(): void {
        
        this.svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0, " + this.height + ")")
            .call(this.xAxis);   
    }
    
    /* Draws the Y Axis */
    private drawYAxis(): void {
        this.svg.append("g")
            .attr("class", "axis axis--y")
            .call(this.yAxis);
    }

    /* Populates datasets into line graphs */
    private populate(): void {
        this.paths = this.svg.append("g")
            .attr('clip-path', "url(" + this.url + "#clip)");
        
        // for now, only handle displaying one sensor
        let sensor = this.data[this.displaySensors[0]];
        let extents = sensor.extents();
        console.log('extents', extents);
        // set scale domains
        this.xScale.domain([extents.xMin, extents.xMax]);
        this.yScale.domain([extents.yMin, extents.yMax]);
        this.x0Scale.domain(this.xScale.domain());
        // draw lines
        for (let dim in sensor.signals) {
            let signal = sensor.signals[dim];
            let style = "line " + signal.sensor + "--" + signal.dim;

            console.log(dim, signal);
            this.paths.append("path")
                .datum(signal.readings)
                .attr("class", style)
                .attr("d", this.line);
        }
    }

    /* Sets up D3 zoom behavior */
    private setupZoom(): void {
        console.log('setting up zoom', this.svg);
        this.svg.append("rect")
        .attr("class", "zoom")
        .attr("width", this.width)
        .attr("height", this.height)
        .style("pointer-events", "all")
        .call(
            d3.zoom()
            .scaleExtent([1, 50])
            .on("zoom", () => this.zoomed()));
    }

    private zoomed(): void {
        var t = d3.event.transform;
        this.xScale.domain(t.rescaleX(this.x0Scale).domain());
        this.svg.selectAll(".line").attr("d", this.line);
        this.svg.select(".axis--x").call(this.xAxis);
    }
}