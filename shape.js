/*
Class name   : Shape
Description  : Represents a shape object (rectangle or ellipse) with specified dimensions, colors, and border properties.
*/
class Shape {
    constructor(x, y, w, h, type, borderColor, fillColor, borderThickness) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type;  // 'rectangle' or 'ellipse'
        this.borderColor = borderColor;
        this.fillColor = fillColor;
        this.borderThickness = borderThickness;
    }

    /*
    Method name  : draw
    Description  : Draws the shape on the canvas with specified border color, fill color, and border thickness.
    Parameters   : None
    Return value : None
    */
    draw() {
        stroke(this.borderColor);
        if (this.borderThickness == "None") {
            strokeWeight(0);
        }
        else {
            strokeWeight(this.borderThickness);
        }
        fill(this.fillColor);
        if (this.type === 'rectangle') {
            rect(this.x, this.y, this.w, this.h);
        } else if (this.type === 'ellipse') {
            ellipse(this.x, this.y, this.w, this.h);
        }
    }
}