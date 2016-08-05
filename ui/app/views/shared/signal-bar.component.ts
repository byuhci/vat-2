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

    @Input('sig_id') _id: number;
    @Input() data: any;

    ngOnInit() {
        console.log('on init', this.data);

        //var data = this.data;
        var data = [{tick: 1, dimensions: ["1","2","3"]},
                    {tick: 2, dimensions: ["10","2","3"]},
                    {tick: 3, dimensions: ["12","2","3"]},
                    {tick: 4, dimensions: ["14","2","3"]},
                    {tick: 5, dimensions: ["5","2","3"]},
                    {tick: 6, dimensions: ["-1","2","3"]},
                    {tick: 7, dimensions: ["-16","2","3"]},
                    {tick: 8, dimensions: ["0","2","3"]},
                    {tick: 9, dimensions: ["9","2","3"]},
                    {tick: 10, dimensions: ["16","2","3"]},
                    {tick: 11, dimensions: ["12","2","3"]}];

        var margin = {top: 20, right: 60, bottom: 30, left: 20};
        var width = 960 - margin.left - margin.right;
        var height = 500 - margin.top - margin.bottom;

        var x = d3.scaleLinear()
            .range([0, width]);

        var y = d3.scaleLinear()
            .range([height, 0]);

        var xAxis = d3.axisBottom(x)
        .tickSize(-height, 0)
        .tickPadding(6);

        var yAxis = d3.axisRight(y)
        .tickSize(-width)
        .tickPadding(6);

        var area = d3.area()
        .x(function(d) { return x(d.tick); })
        .y0(y(0))
        .y1(function(d) { return y(+d.dimensions[0]); });

        var draw_my_line = d3.line()
            .x(function(d) { console.log('ld', d); return x(d.tick); })
            .y(function(d) { return y(+d.dimensions[0]); });

        var svg = d3.select(".lower-signal-widget").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        console.log('init svg', svg);
        var gradient = svg.append("defs").append("linearGradient")
        .attr("id", "gradient")
        .attr("x2", "0%")
        .attr("y2", "100%");

        var zoom = d3.zoom()
        .on("zoom", draw);
        
        gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#fff")
        .attr("stop-opacity", .5);

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#999")
            .attr("stop-opacity", 1);

        svg.append("clipPath")
            .attr("id", "clip")
        .append("rect")
            .attr("x", x(0))
            .attr("y", y(1))
            .attr("width", x(1) - x(0))
            .attr("height", y(0) - y(1));

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + width + ",0)");

        svg.append("path")
            .attr("class", "area")
            .attr("clip-path", "url(#clip)")
            .style("fill", "url(#gradient)");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")");

        svg.append("path")
            .attr("class", "line")
            .attr("clip-path", "url(#clip)");

        svg.append("rect")
            .attr("class", "pane")
            .attr("width", width)
            .attr("height", height)
            .call(zoom);
    
        x.domain(d3.extent(data, function(d) { return d.tick; }));
        y.domain(d3.extent(data, function(d) { return +d.dimensions[0]; }));
        // zoom.x(x);
        console.log('x', x);

        // svg.select("path.area").data(this.data);
        console.log('data to add', data);
        svg.select("path.line").data(data, function(d) {
            console.log('d', d, this);
            return d ? d : {tick: 0, dimensions: ["1", "2", "3"]};
        });
        // console.log('path', this.svg.select("path.line"));
        console.log('drawing', svg);
        draw();

        function draw() {
            console.log('draw method', draw_my_line);
            svg.select("g.x.axis").call(xAxis);
            svg.select("g.y.axis").call(yAxis);
            // svg.select("path.line").attr("d", area);
            svg.select("path.line").attr("d", draw_my_line);
        }
    }

    

}