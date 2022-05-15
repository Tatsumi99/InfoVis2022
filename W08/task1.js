d3.csv("https://tatsumi99.github.io/InfoVis2022/W08/task1data.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value;});

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            margin: {top:10, right:10, bottom:20, left:60}
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
            // .domain([0, d3.max(self.data, d => d.value)])
             .range([0, self.inner_width]);
    
            self.yscale = d3.scaleBand()
            // .domain(self.data.map(d => d.label))
             .range([0, self.inner_height])
            // .paddingInner(0.1);
    
            // Initialize axes
            self.xaxis = d3.axisBottom( self.xscale )
             .ticks(5)
            .tickSizeOuter(0);

            self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);

            // Draw the axis
           // self.xaxis_group = self.chart.append('g')
            //.attr('transform', `translate(0, ${self.inner_height})`)
            

            //self.yaxis_group = self.chart.append('g')
            
        }    

    update() {
        let self = this;

        
       // self.xmin = d3.min( self.data, d => d.value );
        const xmax = d3.max( self.data, d => d.value );
        self.xscale.domain( [0, xmax] );

        //self.ymin = d3.min( self.data, d => d.value );
       // const ymax = d3.map( self.data, d => d.label );
        //self.yscale.domain( ymax );
        self.yscale
        .domain(self.data.map(d => d.label))
        .paddingInner(0.1);
        self.render();
    }

    render() {
        let self = this;

        self.xaxis_group = self.chart.append('g')
        .attr('transform', `translate(0, ${self.inner_height})`)
        .call(self.xaxis);

        self.yaxis_group = self.chart.append('g')
        .call(self.yaxis);


         self.chart.selectAll("rect").data(self.data).enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", d => self.yscale(d.label))
            .attr("width",  d => self.xscale(d.value))
            .attr("height", self.yscale.bandwidth());

         


    }
}
