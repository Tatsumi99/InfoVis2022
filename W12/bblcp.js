var data_set2 = 
 [
          {name:"aaa", val:58},
          {name:"bbb", val:88},
          {name:"ccc", val:48},
          {name:"ddd", val:73},
          {name:"eee", val:81},
          {name:"fff", val:31}  ]  ;
          

        const data_set = {children:[
 ]
};

//console.log(data_set.children[0])


for(i=0;i<data_set2.length;i++){
    data_set.children.push(data_set2[i])
}

//console.log(data_set)

//data_set[0].appendChild(data_set2[0]);




          
var width=600, height=300;
var bubble = d3.pack()
.size([width, height])
.padding(1.5) ;

var nodes = d3.hierarchy( data_set )
      .sum(function(d){ return d.val })
  ;

var bubble_data = bubble(nodes).descendants() ;

console.log(bubble_data)

var no_root_bubble = bubble_data.filter( function(d){ return d.parent != null ;} ) ;

var max_val = d3.max(no_root_bubble, function(d){ return d.r ;});     
var min_val = d3.min(no_root_bubble, function(d){return d.r ; });

var color_scale = d3.scaleLinear()
.domain( [min_val, max_val] )
.range(d3.schemeCategory10 );


var font_scale = d3.scaleLinear()
.domain([min_val, max_val])
.range([9, 28]);

var bubbles = d3.select("#content")
.selectAll(".bubble")
.data(no_root_bubble)
.enter()
.append("g")
.attr("class", "bubble")
.attr("transform", function(d){ return "translate("+d.x+","+d.y+")" ;})
;

bubbles.append("circle")
.attr("r", function(d){ return d.r })
.style("fill", function(d,i){ 
        return color_scale(d.r); 
});                  
; 
bubbles.append("text")
.attr("text-anchor", "middle")
.attr("dominant-baseline", "central")
.text(function(d){ return d.data.name ; })
.style("font-size", "10pt")
;