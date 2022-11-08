class Button{ 
    constructor(i, j, width, height, colour, text, textColour) {
        this.i = i;
        this.j = j;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.text = text;
        this.textColour = textColour;

        this.showButton = function() {
            fill(`${this.colour}`);
            rect(this.i, this.j, this.width, this.height);
        }

        this.showText = function() {
            textAlign(CENTER);
            textFont(myFont);
            textSize(20);
            fill(`${this.textColour}`);
            text(this.text, this.i + this.width / 2, this.j + this.height / 2);
        }
      
        this.buttonClicked = function() {
            if (mouseX >= this.i && mouseX <= this.i + this.width) {
                if (mouseY >= this.j && mouseY <= this.j + this.height) {
                    if (mouseIsPressed && theBoardList.length - 2 >= 0) {
                        return true;
                    }
                }
              }
        }
    }
}