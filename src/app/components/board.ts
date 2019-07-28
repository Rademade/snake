import { Cell, Coordinates } from './cell';
import Snake from './snake';

export default class Board {
  width: number;
  height: number;
  cells: Cell[][];

  constructor(width: number = 50, height: number = 50) {
    this.width = width;
    this.height = height;
    this.cells = this.initCells();
  }

  public getCell(coordinates: Coordinates): Cell {
    const x = this.coordinatesCorrection(coordinates.x, this.height);
    const y = this.coordinatesCorrection(coordinates.y, this.width);
    return this.cells[y][x];
  }

  public clearBoard(): void {
    this.cells = this.initCells();
  }

  private coordinatesCorrection(x: number, max: number) {
    if (x < 0) {
      return max;
    } else if (x > max - 1) {
      return 0;
    } else {
      return  x;
    }
  }
  // ES6
  // Array.from({length: 10}, (row, rowId) => {
  //   return Array.from({length: 10}, (cell, cellId) => rowId + "-" + cellId);
  // })
  private initCells() {
    const cells: Cell[][] = [];
    for (let yi = 0; yi < this.height; yi++) {
      const row: Cell[] = [];
      for (let xi = 0; xi < this.width; xi++) {
        row.push(new Cell(xi, yi));
      }
      cells.push(row);
    }

    return cells;
  }


}
