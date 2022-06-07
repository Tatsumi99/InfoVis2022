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
            [30,30,30,30,30,30],[60,60,60,60,60,60],[90,90,90,90,90,90],[120,120,120,120,120,120],[150,150,150,150,150,150]
        ];
  
        self.dataarr=[]
        for(self.i=0;self.i<self.data.length;self.i++){
        self.dataarr.push(self.data[self.i].val)}

        self.stage = d3.select("#demo_stage");
        self.svg = self.stage.append("svg")
        .attr("width",500)
        .attr("height",500);
        
        self.scale = d3.scaleLinear()
        .domain([0,6]).range([0,5]);

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
        .attr("stroke", function(d){return "skyblue";})
        .attr("stroke-width", 2)
        ;

        self.svg.selectAll("path").attr("fill", "none")
        

        
        
      //  console.log(self.scale(self.dataarr))
       
        self.svg.selectAll("text")  
        .data(self.data)
        .enter()
        .append("text")
        .attr("font-weight", "bold")
        .text(function(d, i){ return d.name; })
        .transition()
        .duration(1000)
        .attr("x", function(d,i){return 150 * Math.sin(Math.PI*2/6 * i) + 170;})
        .attr("y", function(d,i){return 150 * Math.cos(Math.PI*2/6 * i) + 200;})
        ;

        for(self.i=1;self.i<=5;self.i++){
        self.svg
        .append("text")
        .text(self.i*30)
        .transition()
        .delay(1000)
        .duration(1000)
        .attr("x",200)
        .attr("y",175-25*(self.i-1));
        }
    }
     
    
}