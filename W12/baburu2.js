d3.csv("https://tatsumi99.github.io/InfoVis2022/W12/publisher.csv")
.then(data=>{
  data.forEach( d => { d.val = +d.val;});

  var config = {
    parent: '#content',
    width: 3000,
    height: 3000,
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
    self.no_root_bubble = self.bubble_data.filter(d=> d.parent != null ) ;
   // console.log(self.no_root_bubble)
    
    var max_val = d3.max(self.no_root_bubble, d=> d.r);     
    var min_val = d3.min(self.no_root_bubble, d=>d.r);

  self.color_scale = d3.scaleLinear()
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
      .attr("transform", d=>"translate("+d.x+","+d.y+")")
      .join("#content")
      ;
      

      bubbles.append("circle")
      .transition().duration(500)
      .delay((d,i)=>i*100) 
      .attr("r", d=> d.r)
      .transition().duration(500)
      .style("fill", (d,i)=>self.color_scale(d.r))                   
      ; 
      bubbles.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "text-after-edge")
      .text(d=> d.data.name)
      .style("font-size", "20pt")
      ;

      bubbles.append("text")
      .attr("dominant-baseline", "text-before-edge")
      .text(d=> d.data.val)
      .style("font-size", "20pt")
      ;

      
      
    }
  }

  
