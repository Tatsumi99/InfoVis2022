class BarChart {

    constructor( config, data ) {
        this.config = {
            parent: '#drawing_region',
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:10, right:10, bottom:20, left:60}
        }
        this.data = [
            {label:'Apple', value:100},
            {label:'Banana', value:200},
            {label:'Cookie', value:50},
            {label:'Doughnut', value:120},
            {label:'Egg', value:80}
        ];
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
    
            const xscale = d3.scaleLinear()
             .domain([0, d3.max(data, d => d.value)])
             .range([0, inner_width]);
    
             const yscale = d3.scaleBand()
             .domain(data.map(d => d.label))
             .range([0, inner_height])
             .paddingInner(0.1);
    
            // Initialize axes
             const xaxis = d3.axisBottom( xscale )
             .ticks(5)
            .tickSizeOuter(0);

            const yaxis = d3.axisLeft( yscale )
            .tickSizeOuter(0);

            // Draw the axis
            const xaxis_group = chart.append('g')
            .attr('transform', `translate(0, ${inner_height})`)
            .call( xaxis );

            const yaxis_group = chart.append('g')
            .call( yaxis );
        }    

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.value );
        const xmax = d3.max( self.data, d => d.value );
        self.xscale.domain( [0, xmax] );

        const ymin = d3.min( self.data, d => d.value );
        const ymax = d3.max( self.data, d => d.value );
        self.yscale.domain( [0, ymax] );

        self.render();
    }

    render() {
        let self = this;

        // Draw bars
            chart.selectAll("rect").data(data).enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", d => yscale(d.label))
            .attr("width", d => xscale(d.value))
            .attr("height", yscale.bandwidth());

    }
}
