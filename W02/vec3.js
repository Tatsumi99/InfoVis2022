class Vec3{

constructor( x, y, z )
{
    this.x = x;
    this.y = y;
    this.z = z;
}

add = function( v )
{
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
}

sub = function( v )
{
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
}

sum = function()
{
    return this.x + this.y + this.z;
}

min = function()
{
    //return Math.min( this.x, this.y, this.z );
    const m =  this.x < this.y ? this.x : this.y;
    return m < this.z ? m : this.z;
}

max = function()
{
    //return Math.max( this.x, this.y, this.z );
    const m = this.x > this.y ? this.x : this.y;
    return m > this.z ?  m:this.z;}

mid = function()
{
    return this.sum() - this.min() - this.max();
}

cross = function( v )
{
    var x = this.x, y = this.y, z = this.z;
    this.x = y * v.z - z * v.y;
    this.y = z * v.x - x * v.z;
    this.z = x * v.y - y * v.x;
    return this;
}

length = function(v0,v1)
{
    var ans = Math.sqrt( (v0.x - v1.x) * (v0.x - v1.x) + (v0.y - v1.y) * (v0.y - v1.y) + (v0.z - v1.z) * (v0.z - v1.z) );
    //document.write( ans+"<br>" );
    return ans
}

AreaOfTriangle = function(v0,v1,v2)
{
    var a = v0.length(v0,v1);
    var b = v0.length(v0,v2);
    var c = v0.length(v1,v2);

    var s = (a+b+c)/2;
    var Area = Math.sqrt(s*(s-a)*(s-b)*(s-c));
    return Area;
}

}