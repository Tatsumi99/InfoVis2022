d3.csv("https://tatsumi99.github.io/InfoVis2022/W12/Book2.csv")
    .then( data => {
        data.forEach( d => { d.Weight = +d.Weight;});

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 10000,
            margin: {top:10, right:10, bottom:20, left:100}
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
    
            self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
            self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
    
            self.xscale = d3.scaleLinear()
             .domain([0, d3.max(self.data, d => d.Weight)])
             .range([0, self.inner_width]);
    
            self.yscale = d3.scaleBand()
             .domain(self.data.map(d => d.name))
             .range([0, self.inner_height]);
            
    
            // Initialize axes
            self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);

            self.yaxis = d3.axisLeft( self.yscale )
            .ticks(5)
            .tickSizeOuter(0);

            // Draw the axis
           // self.xaxis_group = self.chart.append('g')
            //.attr('transform', `translate(0, ${self.inner_height})`)
            

            //self.yaxis_group = self.chart.append('g')
            
        }    

    update() {
        let self = this;

        const xmax = d3.max( self.data, d => d.Weight );
        self.xscale.domain( [0, xmax] );

        self.yscale.domain(self.data.map(d => d.name))
        .paddingInner(0.1);

        self.chart.selectAll("text").remove();

        self.render();
    }

    render() {
        let self = this;

        self.xaxis_group = self.chart.append('g')
        .attr('transform', `translate(0, ${self.inner_height})`)
        .call(self.xaxis);

        self.yaxis_group = self.chart.append('g')
        .call(self.yaxis);


         self.chart.selectAll("rect")
         .data(self.data)
            .join("rect")
            .transition().duration(1000)
            .attr("x", 0)
            .attr("y", d => self.yscale(d.name))
            .attr("width",  d => self.xscale(d.Weight))
            .attr("height", self.yscale.bandwidth());

        d3.select('#reverse')
            .on('click', d => {
                self.data.reverse();
                self.update(self.data);
            });

            
        d3.select('#Descend')
        .on('click', d => {
            self.data.sort((a, b) => (b.Weight - a.Weight));
            self.update(self.data);
        });

        d3.select('#Ascend')
        .on('click', d => {
            self.data.sort((a, b) => (a.Weight - b.Weight));
            self.update(self.data);
        });

            d3.select('#black')
            .on('click', d => {
                self.chart.selectAll('rect').attr('fill','black');
            });
            
            d3.select('#green')
            .on('click', d => {
                self.chart.selectAll('rect').attr('fill','green');
            });
            
            d3.select('#blue')
            .on('click', d => {
                self.chart.selectAll('rect').attr('fill','skyblue');
            });
    }
}
