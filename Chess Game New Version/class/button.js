class Button{ 
    constructor(i, j, width, height, colour, text, textColour, textSize) {
        this.i = i;
        this.j = j;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.text = text;
        this.textColour = textColour;
        this.textSize = textSize;
    }

    showButton = () => {
        fill(`${this.colour}`);
        rect(this.i, this.j, this.width, this.height);
    }

    showText = () => {
        textAlign(CENTER);
        textFont(myFont);
        textSize(this.textSize);
        fill(`${this.textColour}`);
        text(this.text, this.i + this.width / 2, this.j + this.height / 2);
    }

    showHover = () => {
        if (mouseX >= this.i && mouseX <= this.i + this.width) {
            if (mouseY >= this.j && mouseY <= this.j + this.height) {
                fill('gray');
                rect(this.i, this.j, this.width, this.height);
            }
        }
    }
      
    buttonClicked = (someFunc) => {
        if (mouseX >= this.i && mouseX <= this.i + this.width) {
            if (mouseY >= this.j && mouseY <= this.j + this.height) {
                if (mouseIsPressed) {
                    someFunc();
                }
            }
        }
    }
}