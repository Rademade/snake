export enum CellType {
  Snake,
  Food,
  Blank
}

export interface Coordinates {
  x: number;
  y: number;
}

export class Cell implements Coordinates {
  x: number;
  y: number;
  type: CellType = CellType.Blank;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setFood(): Cell {
    this.type = CellType.Food;
    return this;
  }

  setSnake(): Cell {
    this.type = CellType.Snake;
    return this;
  }

  setBlank(): Cell {
    this.type = CellType.Blank;
    return this;
  }

  isSnake(): boolean {
    return this.type === CellType.Snake;
  }
}
