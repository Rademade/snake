import Board from './board';
import { Coordinates, Cell } from './cell';

export class FoodGenerator {
  public place(board: Board): Cell {
    const x = this.getRandomInt(board.height - 1);
    const y = this.getRandomInt(board.width - 1);
    const cell = board.getCell({x, y});

    if (cell.isBlank()) {
      cell.setFood();
      return cell;
    } else {
      return this.place(board);
    }
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
