d3.csv("https://tatsumi99.github.io/InfoVis2022/W12/power.csv")
.then(data=>
    {
        
  data.forEach( d => { d.val = +d.val;});
  var grid = [
    [1,1,1,1,1,1],[2,2,2,2,2,2],[3,3,3,3,3,3],[4,4,4,4,4,4],[5,5,5,5,5,5]
];
console.log(grid[0])
var dataarr=[]
for(i=0;i<data.length;i++){
dataarr.push(data[i].val)}
console.log(dataarr)
var arr =[];

var stage = d3.select("#demo_stage");
    var svg = stage.append("svg")
        .attr("width",200)
        .attr("height",200);
        
var scale = d3.scaleLinear()
        .domain([0,5]).range([0,90]);

    var line = d3.line()
        .x(function(d,i){return scale(d) * Math.sin(Math.PI*2/6 * i) + 110;})
        .y(function(d,i){return scale(d) * Math.cos(Math.PI*2/6 * i) + 110;})
        
    svg.selectAll("path.grid")
        .data(grid)
        .enter()
        .append("path")
        .attr("d", function(d,i){return line(d)+"z";})
        .attr("stroke", "black")
        .attr("stroke-dasharray", "2");

    svg.selectAll("path.data")
        .data(dataarr)
        .enter()
        .append("path")
        .attr("d", function(d){return line(dataarr)+"z";})
        .attr("stroke", function(d){return "red";})
        .attr("stroke-width", 2);

    svg.selectAll("path").attr("fill", "none")

  

})
  

