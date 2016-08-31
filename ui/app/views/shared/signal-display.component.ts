import { Component, OnInit, OnChanges, Input, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Signal } from './../../util/signal';
declare var d3: any;

@Component({
    moduleId: module.id,
    selector: 'vat-signal',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./signal-display.component.css', './signals.css']
})
export class SignalDisplayComponent implements OnInit, OnChanges {

    // always returns an array, even if the Input property has not been initialized yet
    @Input("signals") _signals: Signal[];
    get signals(): Signal[] {return this._signals || [];}

    private sensors: Set<string>;

    private host;        // D3 object referencing host dom object
    private svg;         // SVG in which we will print our chart
    private margin;      // Space between the svg borders and the actual chart graphic
    private width;       // Component width
    private height;      // Component height
    private xScale;      // D3 scale in X
    private x0Scale;     // Original scale for X
    private yScales;      // D3 scale in Y
    private xAxis;       // D3 X Axis
    private yAxes;       // D3 Y Axis
    private htmlElement; // Host HTMLElement
    private lines;        // D3 Line
    private view;        // View Container for the chart
    private paths;       // Container for all line paths
    private url;         // The relative url path from root
    private zoom;        // The zoom behavior
    private portal;  // The zoom portal in the background to register zoom events
 

    constructor(private element: ElementRef, private route: ActivatedRoute) { 
        this.htmlElement = this.element.nativeElement;
        this.host = d3.select(this.element.nativeElement);
    }

    ngOnInit() { 
        console.log('received input', this.signals);
    }

    /* Will Update on every @Input change */
    @HostListener('window:resize', [])
    ngOnChanges() {
        console.log('registering changes');
        this.setUrl();
        this.setup();
        this.buildSVG();
        this.populate();
        this.drawXAxis();
        this.drawYAxis();
        this.setInitialZoom();
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

    /** Sets up the chart container */
    private setup(): void {
        // set width and height
        this.margin = { top: 20, right: 40, bottom: 40, left: 50 };
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.clientHeight - this.margin.top - this.margin.bottom;

        // initialize local variable for iterating over y-axes
        this.sensors = new Set(this.signals.map(sig => sig.sensor));
        console.log('displayed sensors', this.sensors);

        // x-scale
        this.xScale = d3.scaleLinear().range([0, this.width]);
        this.x0Scale = d3.scaleLinear().range([0, this.width]);
        
        // y-scales
        this.yScales = {};
        this.sensors.forEach(sensor => {
            this.yScales[sensor] = d3.scaleLinear().range([this.height, 0]);
        });

        // x-axis
        this.xAxis = d3.axisBottom(this.xScale);

        // y-axes
        this.yAxes = {};
        let left: boolean = true;
        this.sensors.forEach(sensor => {
            if (left) {
                this.yAxes[sensor] = d3.axisLeft(this.yScales[sensor]);
            }
            else {
                this.yAxes[sensor] = d3.axisRight(this.yScales[sensor]);
            }
            left = !left;
        });

        // line functions
        this.lines = {};
        this.sensors.forEach(sensor => {
            this.lines[sensor] = d3.line()
                                    .x((d: any) => this.xScale(d.tick))
                                    .y((d: any) => this.yScales[sensor](d.value));
        });
    }
    
    /** Builds the SVG Element */
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
        
        this.zoom = d3.zoom()
            .scaleExtent([1, 50])
            .on("zoom", () => this.zoomed());

        this.portal = this.svg.append("rect")
            .attr("class", "zoom")
            .attr("width", this.width)
            .attr("height", this.height)
            .style("pointer-events", "all")
            .call(this.zoom);
    }

    /** Populates datasets into line graphs */
    private populate(): void {
        this.paths = this.svg.append("g")
            .attr('clip-path', "url(" + this.url + "#clip)");
        
        let hasXScale: boolean = false;
        let yDomains: Set<string> = new Set<string>();

        // draw lines
        for (let signal of this.signals) {
            let extents = signal._sensor.extents();

            // set x-scale domains
            if (!hasXScale) {
                console.debug("setting x-scale domain");
                this.xScale.domain([extents.xMin, extents.xMax]);
                this.x0Scale.domain(this.xScale.domain());
                hasXScale = true;
            }
            // set y-scale domains
            if (!(signal.sensor in yDomains)) {
                console.debug("setting y-scale domain for:", signal.sensor)
                this.yScales[signal.sensor].domain([extents.yMin, extents.yMax]);
                yDomains.add(signal.sensor);
            }

            let style = "line " + signal.sensor + "--" + signal.dim + " line--" + signal.sensor;

            console.debug(signal.dim, signal);
            this.paths.append("path")
                .datum(signal.readings)
                .attr("class", style)
                .attr("d", this.lines[signal.sensor])
                .on("mousemove", () => this.mouseover(signal), true);
        } 
    }

    /** Draws the X Axis */
    private drawXAxis(): void {
        
        this.svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0, " + this.height + ")")
            .call(this.xAxis);   
    }
    
    /** Draws the Y Axes, one for each sensor.
     * Note: this code currently only scales up to 4 axes total.
    */
    private drawYAxis(): void {
        let i = 0;
        this.sensors.forEach(sensor => {
            let axis = this.svg.append("g").attr("class", "axis axis--y axis--"+sensor);
            // put the second and third axes on the right, the first and fourth on the left
            if (i == 1 || i == 2) {
                axis.attr("transform", "translate( " + this.width + ", 0 )");
            }
            axis.call(this.yAxes[sensor].tickFormat(d3.format(".2s")));
            i++;
        });
    }

    /** Sets up the initial zoom scale */
    private setInitialZoom(): void {
        this.zoom.scaleTo(this.portal, 2);
    }

    private zoomed(): void {
        var t = d3.event.transform;
        this.xScale.domain(t.rescaleX(this.x0Scale).domain());
        this.sensors.forEach(sensor => {
            let selector = ".line--" + sensor;
            let sel = this.svg.selectAll(selector);
            console.debug('zoom', sensor, sel, selector);
            sel.attr("d", this.lines[sensor]);
        });
        //this.svg.selectAll(".line").attr("d", this.line);
        this.svg.select(".axis--x").call(this.xAxis);
    }

    private mouseover(signal: Signal) {
        console.log('d', signal);
    }
}