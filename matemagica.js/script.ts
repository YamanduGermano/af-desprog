interface Matemagica{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    sizes: {width:number,height:number};
    draw(): void;
    start_rendering(): void
}

class Matemagica {
    constructor(id: string) {
        this.canvas = <HTMLCanvasElement> document.getElementById(id!)!;
        this.ctx = this.canvas.getContext("2d")!;
    }
    
    draw() {

        this.canvas.width = this.sizes.width;
        this.canvas.height = this.sizes.height;
        
        let width = this.ctx.canvas.width
        let height = this.ctx.canvas.height

        for (let index = 0; index < width; index += 100) {
            this.ctx.beginPath(); // Start a new path
            this.ctx.moveTo(index, 0); // Move the pen to (30, 50)
            this.ctx.lineTo(index, height); // Draw a line to (150, 100)
            this.ctx.stroke(); // Render the path           
        }

        for (let index = 0; index < height; index += 100) {
            this.ctx.beginPath(); // Start a new path
            this.ctx.moveTo(0, index); // Move the pen to (30, 50)
            this.ctx.lineTo(width, index); // Draw a line to (150, 100)
            this.ctx.stroke(); // Render the path           
        }

        // window.requestAnimationFrame(this.draw.bind(this));
    }

    start_rendering() {
        let rect = this.canvas.getBoundingClientRect()
        this.sizes.height = rect.height;
        this.sizes.width = rect.width;
        
        this.canvas.width = this.sizes.width;
        this.canvas.height = this.sizes.height;

        window.addEventListener("resize",(event)=>{
            let rect = this.canvas.getBoundingClientRect()
            this.sizes.height = rect.height;
            this.sizes.width = rect.width;
            
        },false)

        // this.canvas.addEventListener('wheel',function(event){
        //     console.log("Deltax: "+ event.deltaX);
        //     console.log("Deltay: "+ event.deltaY);
        //     event.preventDefault();
        // }, false);

        window.requestAnimationFrame(this.draw.bind(this));
    }
}