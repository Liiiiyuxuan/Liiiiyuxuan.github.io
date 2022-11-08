class Button{ 
    constructor(i, j, width, length, text) {
        this.i = i;
        this.j = j;
        this.width = width;
        this.length = length;
        this.text = text;

        this.showButton = function() {
            let x = this.j
            let y = this.i
        }
      
        this.buttonClicked = function() {
            let x = this.j * (boardSize / rows);
            let y = this.i * (boardSize / columns);
        }
    }
}