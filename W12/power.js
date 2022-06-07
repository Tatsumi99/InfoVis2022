var stage = d3.select("#demo_stage");
    var svg = stage.append("svg")
        .attr("width",200)
        .attr("height",200);

    var grid = [
        [1,1,1,1,1,1],[2,2,2,2,2,2],[3,3,3,3,3,3],[4,4,4,4,4,4],[5,5,5,5,5,5]
    ];
    var dataArr = [
        [3,3.5,4,5,3.5,8]
       ,[5,4.0,2,3,4.0,2]
    ];

    var scale = d3.scaleLinear()
        .domain([0,5]).range([0,90]);

    var line = d3.line()
        .x(function(d,i){return scale(d) * Math.sin(Math.PI*2/6 * i) + 100;})
        .y(function(d,i){return -scale(d) * Math.cos(Math.PI*2/6 * i) + 100;})
        
    svg.selectAll("path.grid")
        .data(grid)
        .enter()
        .append("path")
        .attr("d", function(d,i){return line(d)+"z";})
        .attr("stroke", "black")
        .attr("stroke-dasharray", "2");

    svg.selectAll("path.data")
        .data(dataArr)
        .enter()
        .append("path")
        .attr("d", function(d,i){return line(d)+"z";})
        .attr("stroke", function(d,i){return i ? "red": "blue";})
        .attr("stroke-width", 2);

    svg.selectAll("path").attr("fill", "none")
