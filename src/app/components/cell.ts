enum CellType {
  Snake,
  Food,
  Blank
}

class Cell {
  x: number;
  y: number;
  type: CellType = CellType.Blank;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setFood() {
    this.type = CellType.Food;
  }

  setSnake() {
    this.type = CellType.Snake;
  }

  setBlank() {
    this.type = CellType.Blank;
  }
}
