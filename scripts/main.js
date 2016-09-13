/**
 * Created by sanjanabadam on 9/13/16.
 */

$(document).ready(function () {

    $.ajax({
        url: 'dbConn.php'
    }).done(function (result) {
        var jsonData = JSON.parse(result);
        for(key in jsonData){
            console.log(key)
            console.log(jsonData[key])
        }
        plotGraph(jsonData);
    });

    function plotGraph(data) {
        var yy = {};
        var i = 0;
        for(key in data){
         yy[i] = parseFloat(data[key])
            i++;
        }
        var maxValue = d3.max(d3.entries(yy), function (d) {
            return d.value
        })

        var x = d3.scale.linear()
            .domain([0, maxValue])
            .range([0, 420]);

        d3.select(".chart")
            .selectAll("div")
            .data(d3.values(data))
            .enter().append("div")
            .style("width", function(d) { return x(d)  + "px"; })
            .text(function(d) { return d; });
    }
});
