d3.csv("https://tatsumi99.github.io/InfoVis2022/W12/bbl.csv")
.then(data=>{
  data.forEach( d => { d.val = +d.val;});

  var config = {
    parent: '#content',
    width: 600,
    height: 300,
    margin: {top:10, right:10, bottom:20, left:20}
};

  const Bubble_Chart = new BubbleChart( config, data );
  Bubble_Chart.update();

})
  

  class BubbleChart{
    constructor(config,data){
      this.config = {
        parent: config.parent,
        width: config.width || 256,
        height: config.height || 128,
        margin: config.margin || {top:10, right:10, bottom:20, left:60}
    }
    this.data = data;
    
    this.init();
    }

    init(){
      let self=this;
      self.data_set = {children:[ ]
      };

      for(self.i=0;self.i<self.data.length;self.i++){
        self.data_set.children.push(self.data[self.i])
    }

    self.bubble = d3.pack()
    .size([self.config.width, self.config.height])
    .padding(1.5) ;

    self.nodes = d3.hierarchy( self.data_set )
    .sum(d=>d.val);

    }

    update(){
      let self = this;

     self.bubble_data = self.bubble(self.nodes).descendants() ;
     
    //
    self.no_root_bubble = self.bubble_data.filter( function(d){ return d.parent != null ;} ) ;
   // console.log(self.no_root_bubble)
    
    var max_val = d3.max(self.no_root_bubble, function(d){ return d.r ;});     
    var min_val = d3.min(self.no_root_bubble, function(d){return d.r ; });

  var color_scale = d3.scaleLinear()
  .domain( [min_val, max_val] )
  .range(d3.schemeCategory10 );


  var font_scale = d3.scaleLinear()
  .domain([min_val, max_val])
  .range([9, 28]);
    
  self.render();
  }
    render(){
      let self = this;

      var bubbles = d3.select("#content")
      .selectAll(".bubble")
      .data(self.no_root_bubble)
      .enter()
      .append("g")
      .attr("class", "bubble")
      .attr("transform", function(d){ return "translate("+d.x+","+d.y+")" ;})
      ;
      
      bubbles.append("circle")
      .attr("r", function(d){ return d.r })
      .style("fill", "skyblue");                  
      ; 
      bubbles.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .text(function(d){ return d.data.name ; })
      .style("font-size", function(d){ return self.font_scale(d.r) ; })
      ;
    }
  }

  
