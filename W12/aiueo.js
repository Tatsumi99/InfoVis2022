var w = 200,
    h = 200,
    svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h),
    dataset = [
      [5, 5, 2, 5, 8, 2, 3],
      [2, 1, 5, 2, 5, 6, 7]
    ],
    paramCount = dataset[0].length,
    max = d3.max(d3.merge(dataset)),
    rScale = d3.scalelinear()
               .domain([0, max])
               .range([0, w/2]),
    grid = (function(){
      var result = [];
      for(var i=1; i<=max; i++){
        var arr = [];
        for (var j=0; j<paramCount; j++){
          arr.push(i);
        }
        result.push(arr);
      }
      return result;
    })(),
    line = d3.svg.line()
             .x(function(d, i){ return rScale(d) * Math.cos(2 * Math.PI / paramCount * i - (Math.PI / 2)) + w/2; })
             .y(function(d, i){ return rScale(d) * Math.sin(2 * Math.PI / paramCount * i - (Math.PI / 2)) + w/2; })
             .interpolate('linear');
svg.selectAll('path')
   .data(dataset)
   .enter()
   .append('path')
   .attr('d', function(d){
     return line(d)+"z";
   })
   .attr("stroke", "black")
   .attr("stroke-width", 2)
   .attr('fill', 'none');
svg.selectAll("path.grid")
   .data(grid)
   .enter()
   .append("path")
   .attr("d", function(d,i){
     return line(d)+"z";
   })
   .attr("stroke", "black")
   .attr("stroke-dasharray", "2")
   .attr('fill', 'none');