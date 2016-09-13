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
        for(key in data){
            yy[i] = parseFloat(data[key])
            i++;
        }
        var maxValue = d3.max(d3.entries(yy), function (d) {
            return d.value
        })

        var width = 420,
            barHeight = 20;

        var x = d3.scale.linear()
            .domain([0, maxValue])
            .range([0, width]);

        var len = Object.keys(data).length

        var chart = d3.select(".chart")
            .attr("width", width)
            .attr("height", barHeight * len);


        var bar = chart.selectAll("g")
            .data(d3.values(data))
            .enter().append("g")
            .attr("transform", function(d, i) {
                return "translate(0," + i * barHeight + ")"; });

        bar.append("rect")
            .attr("width", x)
            .attr("height", barHeight - 1);

        bar.append("text")
            .attr("x", function(d) {
                return x(d) - 3; })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function(d) {
                return d; });

    }


});