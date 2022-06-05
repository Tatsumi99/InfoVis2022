d3.csv("https://tatsumi99.github.io/InfoVis2022/W12/power.csv")
    .then( data => {
        data.forEach( d => { d.Height = +d.Height;});

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 512,
            margin: {top:10, right:10, bottom:20, left:50}
        };

        const Barplot = new BarChart( config, data );
        Barplot.update();
    })
    .catch( error => {
        console.log( error );
    });

class BarChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:10, right:10, bottom:20, left:60}
        }
        this.data = data;
        this.init();
    }
        init() {
            let self = this;
    
            self.svg = d3.select( self.config.parent )
                .attr('width', self.config.width)
                .attr('height', self.config.height);
    
            self.chart = self.svg.append('g')
                .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
    
            self.grid = [
                [1,1,1,1,1],[2,2,2,2,2],[3,3,3,3,3],[4,4,4,4,4],[5,5,5,5,5]
            ];

            self.scale = d3.scaleLinear()
            .domain([0,5]).range([0,90]);

            self.line = d3.line()
            .x(function(d,i){return self.scale(self.data) * Math.sin(Math.PI*2/5 * i) + 100;})
            .y(function(d,i){return self.scale(self.data) * Math.cos(Math.PI*2/5 * i) + 100;})
        
            

        }    

    update() {
        let self = this;

        self.chart.selectAll("text").remove();

        self.render();
    }

    render() {
        let self = this;

        self.svg.selectAll("path.grid")
        .data(self.grid)
        .enter()
        .append("path")
        .attr("d", d  => self.line(d)+"z")
        .attr("stroke", "black")
        .attr("stroke-dasharray", "2");
    }
}
