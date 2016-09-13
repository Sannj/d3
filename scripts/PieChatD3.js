/**
 * Created by sanjanabadam on 9/13/16.
 */



$(document).ready(function () {

    $.ajax({
        url: 'dbConn.php'
    }).done(function (result) {
        var jsonData = JSON.parse(result);
        plotGraph(jsonData);
    });


    function plotGraph(data) {

        var j = data
        var yy = {};
        var i = 0;
        for (key in data) {
            yy[i] = parseFloat(data[key])
            i++;
        }
        var maxValue = d3.max(d3.entries(yy), function (d) {
            return d.value
        })

        var len = Object.keys(data).length

        var width = 960,
            height = 500,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);


        var labelArc = d3.svg.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);


        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {
                return d; });

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var g = svg.selectAll(".arc")
            .data(pie(d3.values(data)))
            .enter().append("g")
            .attr("class", "arc")

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) {
                return color(d.value); });

        g.append("text")
            .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) {
                return d.value; });


    }


});