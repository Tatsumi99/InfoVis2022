d3.csv("https://tatsumi99.github.io/InfoVis2022/W12/Hpower.csv")
.then(data=>{

  data.forEach( d => { d.val = +d.val;});

  var config = {
    parent: '#content',
    width: 1000,
    height: 1000,
    margin: {top:300, right:50, bottom:50, left:50}
};

  const Rader_Chart = new RaderChart( config, data );
  Rader_Chart.update();

})

class RaderChart{
    constructor(config,data){
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:50, right:10, bottom:20, left:60}
        }
        this.data = data;

        this.init();
    }
    init(){
        let self=this;

        self.grid = [
            [1,1,1,1,1,1],[2,2,2,2,2,2],[3,3,3,3,3,3],[4,4,4,4,4,4],[5,5,5,5,5,5]
        ];
  
        self.dataarr=[]
        for(self.i=0;self.i<self.data.length;self.i++){
        self.dataarr.push(self.data[self.i].val)}

        self.stage = d3.select("#demo_stage");
        self.svg = self.stage.append("svg")
        .attr("width",500)
        .attr("height",500);
        
        self.scale = d3.scaleLinear()
        .domain([0,6]).range([0,150]);

        self.line = d3.line()
        .x(function(d,i){return self.scale(d) * Math.sin(Math.PI*2/6 * i) + 200;})
        .y(function(d,i){return self.scale(d) * Math.cos(Math.PI*2/6 * i) + 200;})

      }
      update(){
        let self = this;
  
       
      
    self.render();
    }

    render(){
        let self = this;

        self.svg.selectAll("path.grid")
        .data(self.grid)
        .enter()
        .append("path")
        .attr("d", function(d,i){return self.line(d)+"z";})
        .attr("stroke", "black")
        .attr("stroke-dasharray", "2");


        self.svg.selectAll("path.data")
        .data(self.dataarr)
        .enter()
        .append("path")
        .attr("d", function(d){return self.line(self.dataarr)+"z";}) 
        .transition()
        .duration(750)
        .attr("stroke", function(d){return "red";})
        .attr("stroke-width", 2)
        ;

        self.svg.selectAll("path").attr("fill", "none")
        

        
        
      //  console.log(self.scale(self.dataarr))
       
        self.svg.selectAll("text")  
        .data(self.data)
        .enter()
        .append("text")
        .text(function(d, i){ return d.name; })
        .attr("x", function(d,i){return 150 * Math.sin(Math.PI*2/6 * i) + 200;})
        .attr("y", function(d,i){return 150 * Math.cos(Math.PI*2/6 * i) + 200;});

    }
     
    
}