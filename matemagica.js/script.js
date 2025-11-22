var Matemagica = /** @class */ (function () {
    function Matemagica(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
    }
    Matemagica.prototype.draw = function () {
        this.canvas.width = this.sizes.width;
        this.canvas.height = this.sizes.height;
        var width = this.ctx.canvas.width;
        var height = this.ctx.canvas.height;
        for (var index = 0; index < width; index += 100) {
            this.ctx.beginPath(); // Start a new path
            this.ctx.moveTo(index, 0); // Move the pen to (30, 50)
            this.ctx.lineTo(index, height); // Draw a line to (150, 100)
            this.ctx.stroke(); // Render the path           
        }
        for (var index = 0; index < height; index += 100) {
            this.ctx.beginPath(); // Start a new path
            this.ctx.moveTo(0, index); // Move the pen to (30, 50)
            this.ctx.lineTo(width, index); // Draw a line to (150, 100)
            this.ctx.stroke(); // Render the path           
        }
        // window.requestAnimationFrame(this.draw.bind(this));
    };
    Matemagica.prototype.start_rendering = function () {
        var _this = this;
        var rect = this.canvas.getBoundingClientRect();
        this.sizes.height = rect.height;
        this.sizes.width = rect.width;
        this.canvas.width = this.sizes.width;
        this.canvas.height = this.sizes.height;
        window.addEventListener("resize", function (event) {
            var rect = _this.canvas.getBoundingClientRect();
            _this.sizes.height = rect.height;
            _this.sizes.width = rect.width;
        }, false);
        // this.canvas.addEventListener('wheel',function(event){
        //     console.log("Deltax: "+ event.deltaX);
        //     console.log("Deltay: "+ event.deltaY);
        //     event.preventDefault();
        // }, false);
        window.requestAnimationFrame(this.draw.bind(this));
    };
    return Matemagica;
}());
