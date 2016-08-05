import { Component, OnInit, Input } from '@angular/core';

declare var d3: any;

@Component({
    moduleId: module.id,
    selector: 'vat-signal-bar',
    templateUrl: 'signal-bar.component.html',
    styleUrls: ['signal-bar.component.css']
})
export class SignalBarComponent implements OnInit {
    constructor() { }

    svg;
    private gradient;
    private zoom;
    @Input('sig_id') _id: number;
    @Input() data: any;

    ngOnInit() {
        console.log('on init');
        this.svg = d3.select(".lower-signal-widget").append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        console.log('init svg', this.svg);
        this.gradient = this.svg.append("defs").append("linearGradient")
        .attr("id", "gradient")
        .attr("x2", "0%")
        .attr("y2", "100%");

        this.zoom = d3.zoom()
        .on("zoom", this.draw);
        
        this.gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#fff")
        .attr("stop-opacity", .5);

        this.gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#999")
            .attr("stop-opacity", 1);

        this.svg.append("clipPath")
            .attr("id", "clip")
        .append("rect")
            .attr("x", this.x(0))
            .attr("y", this.y(1))
            .attr("width", this.x(1) - this.x(0))
            .attr("height", this.y(0) - this.y(1));

        this.svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + this.width + ",0)");

        this.svg.append("path")
            .attr("class", "area")
            .attr("clip-path", "url(#clip)")
            .style("fill", "url(#gradient)");

        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.height + ")");

        this.svg.append("path")
            .attr("class", "line")
            .attr("clip-path", "url(#clip)");

        this.svg.append("rect")
            .attr("class", "pane")
            .attr("width", this.width)
            .attr("height", this.height)
            .call(this.zoom);
    
        this.x.domain(d3.extent(this.data, function(d) { return d.tick; }));
        this.y.domain(d3.extent(this.data, function(d) { return d.dimensions[0]; }));

        this.svg.select("path.line").data([this.data]);
        console.log('drawing', this.svg);
        this.draw();
    }

    margin = {top: 20, right: 60, bottom: 30, left: 20};
    width = 960 - this.margin.left - this.margin.right;
    height = 500 - this.margin.top - this.margin.bottom;

    x = d3.scaleLinear()
        .range([0, this.width]);

    y = d3.scaleLinear()
        .range([this.height, 0]);

    xAxis = d3.axisBottom(this.x)
    .tickSize(-this.height, 0)
    .tickPadding(6);

    yAxis = d3.axisRight(this.y)
    .tickSize(-this.width)
    .tickPadding(6);

    area = d3.area()
    .x(function(d) { return this.x(d.tick); })
    .y0(this.y(0))
    .y1(function(d) { return this.y(d.dimensions[0]); });

    line = d3.line()
    .x(function(d) { return this.x(d.tick); })
    .y(function(d) { return this.y(d.dimensions[0]); });

    draw() {
        console.log('draw method', this.svg);
        this.svg.select("g.x.axis").call(this.xAxis);
        this.svg.select("g.y.axis").call(this.yAxis);
        this.svg.select("path.line").attr("d", this.area);
        this.svg.select("path.line").attr("d", this.line);
    }

}