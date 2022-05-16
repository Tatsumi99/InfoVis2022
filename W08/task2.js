d3.csv("https://tatsumi99.github.io/InfoVis2022/W08/task2data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            margin: {top:10, right:10, bottom:80, left:60}
        };

        const linechart = new LineChart( config, data );
        linechart.update();
    })
    .catch( error => {
        console.log( error );
    });

    class LineChart{
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
            .range([0, self.inner_width]);

            self.yscale = d3.scaleLinear()
            .domain( [0, d3.max(self.data, d => d.y)] )
            .range([self.inner_height,0]);

            self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5);
            

            self.yaxis = d3.axisLeft( self.yscale )
            .ticks(5);

            self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)

            self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${0})`);

            self.line = d3.line()
            .x(d => self.xscale(d.x))
            .y(d => self.yscale(d.y));

            self.area = d3.area()
            .x(d => self.xscale(d.x))
            .y1(d => self.yscale(d.y))
            .y0( self.yscale(0));


        }
            update() {
                let self = this;
                const xmax = d3.max(self.data, d => d.x);
                const ymax = d3.max(self.data, d => d.y);
        
                self.xscale
                    .domain([0, xmax]);
                self.yscale
                    .domain([0, ymax]);
        
                self.render();
            }
        render(){
            let self=this;

            self.xaxis_group
            .call(self.xaxis)
            .append('text')
            .text('X')
            .attr('x', 220)
            .attr('y', 40)
            .attr("font-size", "10pt")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .attr('text-anchor', 'middle')
        

        self.yaxis_group
            .call(self.yaxis)
            .append('text')
            .text('Y')
            .attr('x', -80)
            .attr('y', -30)
            .attr("font-size", "10pt")
            .attr("fill", "black")
            .attr("font-weight", "bold")
            .attr('text-anchor', 'middle')
            .attr("transform", "rotate(-90)")
            

            self.chart.append('path')
            .attr('d', self.line(self.data))
            .attr('stroke', 'black')
            .attr('fill', 'none');

            self.chart.append('path')
            .attr('d', self.area(self.data))
            .attr('stroke', 'black')
            .attr('fill', 'skyblue');

            self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", 5)
            .attr("fill", "black")


        }
    
        
    }