
        var data = { 
            children: [
                  {name:"aaa", val:58},
                  {name:"bbb", val:88},
                  {name:"ccc", val:48},
                  {name:"ddd", val:73},
                  {name:"eee", val:81},
                  {name:"fff", val:31}  ] } ;
        
        
        const bubble_plot = new BubblePlot( config, data );
        bubble_plot.update();


class BubblePlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }


     init() {
        let self = this;


        self.bubble = d3.pack()
        .size([self.config.width, self.config.height])
        .padding(1.5) ;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.nodes = d3.hierarchy( self.data_set )
        .sum(function(d){ return d.val });

        self.bubble_data = bubble(self.nodes).descendants() ;

        self.no_root_bubble = self.bubble_data.filter( function(d){ return d.parent != null ;} ) ;

        self.max_val = d3.max(self.no_root_bubble, function(d){ return d.r ;});     
        self.min_val = d3.min(self.no_root_bubble, function(d){return d.r ; });

        self.color_scale = d3.scaleLinear()
        .domain( [min_val, max_val] )
        .range(d3.schemeCategory10 );
    
        self.font_scale = d3.scaleLinear()
        .domain([min_val, max_val])
        .range([9, 28]);

    }

    update() {
        let self = this;

   

        self.render();
    }

    render() {
        let self = this;

        self.bubbles = d3.select("#content")
        .selectAll(".bubble")
        .data(self.no_root_bubble)
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
        .style("font-size", function(d){ return font_scale(d.r) ; })
        ;
        
    }
}
