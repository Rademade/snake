
export default class Board {
  width: number;
  height: number;
  cells: Cell[][];

  constructor(width: number = 50, height: number = 50) {
    this.width = width;
    this.height = height;
    this.cells = this.initCells();
  }

  private initCells() {
    const cells: Cell[][] = [];
    for (let xi = 0; xi < this.width; xi++) {
      const row: Cell[] = [];
      for (let yi = 0; yi < this.height; yi++) {
        row.push(new Cell(xi, yi));
      }
      cells.push(row);
    }

    return cells;
  }
}
