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

        var width = 660,
            height = 500;

        var y = d3.scale.linear()
            .range([height, 0]);

        var chart = d3.select(".chart")
            .attr("width", width)
            .attr("height", height);

        y.domain([0, maxValue]);

        var barWidth = width / len;

        var bar = chart.selectAll("g")
            .data(d3.values(data))
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(" + i * barWidth + ",0)";
            });

        bar.append("rect")
            .attr("y", function (d) {
                return y(d);
            })
            .attr("height", function (d) {
                return height - y(d);
            })
            .attr("width", barWidth - 1);

        bar.append("text")
            .attr("x", barWidth / 2)
            .attr("y", function (d) {
                return y(d) + 3;
            })
            .attr("dy", ".75em")
            .text(function (d) {
                return d;
            });

    }


});