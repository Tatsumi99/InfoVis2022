d3.csv("https://tatsumi99.github.io/InfoVis2022/W12/gender.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value;});

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 512,
            margin: {top:-200, right:10, bottom:300, left:-500},
            innerradius:20
        };

        let piechart = new PieChart( config, data );
        piechart.update();
    })
    .catch( error => {
        console.log( error );
    });

class PieChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:10, right:10, bottom:20, left:60},
            innerradius: config.innerradius || 20,
        }
        this.data = data;
        this.init();
    }
        init() {
            let self = this;
    
            self.svg = d3.select('#drawing_region')
             .attr('width', self.config.width)
             .attr('height', self.config.height)
              .append('g')
              .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);
    
            self.chart = self.svg.append('g')
                .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
    
            self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
            self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
    
            self.xscale = d3.scaleLinear()
            // .domain([0, d3.max(self.data, d => d.value)])
             .range([0, self.inner_width]);
    
            self.yscale = d3.scaleLinear()
            // .domain(self.data.map(d => d.label))
             .range([self.inner_height,30]);
            // .paddingInner(0.1);
    
            // Initialize axes
            self.xaxis = d3.axisBottom( self.xscale )
             .ticks(5);

            self.yaxis = d3.axisLeft( self.yscale )
            .ticks(5);
            
            self.pie = d3.pie()
            .value(d => d.value);
            // Draw the axis
           
            self.arc = d3.arc()
            .innerRadius(self.config.innerradius)
            .outerRadius(Math.min(self.inner_width,self.inner_height, ) / 2);

            
        }    

    update() {
        let self = this;
       // self.arc.innerRadius(self.config.innerradius);
        self.render();
    }

    render() {
        let self = this;

        self.pieChart = self.chart.selectAll('pie')
        .data(self.pie(self.data))
        .enter()
        .append('g')

   
        self.pieChart
        .append('path')
        .attr('d', self.arc)
        .attr('fill', "skyblue")
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('transform', `translate(${self.inner_width / 2}, ${self.inner_height / 2})`)


        self.pieChart
            .append('text')
            .attr('transform', d => `translate(${self.arc.centroid(d)[0] + self.inner_width / 2}, ${self.arc.centroid(d)[1] + self.inner_height / 2})`)
            .attr('dy', '.10px')
            .style('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('font', '15px')
            .attr("stroke", "white")
            .text(d => d.data.gender);

    }
}
