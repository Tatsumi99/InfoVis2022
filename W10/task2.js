d3.csv("https://vizlab-kobe-lecture.github.io/InfoVis2021/W04/data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 350,
            height: 256,
            margin: {top:40, right:30, bottom:80, left:80}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

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

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .domain( [0, d3.max(self.data, d => d.x)] )
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .domain( [0, d3.max(self.data, d => d.y)] )
            .range( [self.inner_height,0]  );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(6);

        self.xaxis_group = self.chart.append('g')
        .attr('transform', `translate(0, ${self.inner_height})`)
 

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(6);

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${0})`);

            
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [0, xmax] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [0, ymax] );

        self.render();
    }

    render() {
        let self = this;
        let circles = self.chart.selectAll('circle')
    .data(self.data)
    .join('circle');

        circles
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r -5)
            .attr("fill", "SkyBlue")



        self.xaxis_group
            .call( self.xaxis )
            .append("text")
            .attr("fill", "black")
            .attr("x", 120)
            .attr("y", 35)
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("X Label");

        self.yaxis_group
            .call( self.yaxis )
            .append("text")
            .attr("fill", "black")
            .attr("x", -70)
            .attr("y", -40)
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("transform", "rotate(-90)")
            .attr("font-weight", "bold")
            .text("Y Label");
        
            self.xaxis_group
            .call( self.xaxis )
            .append("text")
            .attr("fill", "black")
            .attr("x", 120)
            .attr("y", -150)
            .attr("text-anchor", "middle")
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .text("Title");

            circles
            .on('mouseover', (e,d) => {
                d3.select('#tooltip')
                    .style('opacity', 1)
                    .html(`<div class="tooltip-label">Position</div>(${d.x}, ${d.y})`);
            })
            .on('mousemove', (e) => {
                const padding = 10;
                d3.select('#tooltip')
                    .style('left', (e.pageX + padding) + 'px')
                    .style('top', (e.pageY + padding) + 'px');
            })
            .on('mouseleave', () => {
                d3.select('#tooltip')
                    .style('opacity', 0);
            });
    }
}
