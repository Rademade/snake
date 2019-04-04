import { Cell, Coordinates } from './cell';

export enum Direction {
  Up,
  Down,
  Left,
  Right
}

export default class Snake {
  body: Cell[];
  head: Cell;
  direction: Direction;

  constructor(head: Cell, body: Cell[] = [], direction: Direction = Direction.Right) {
    this.body = body.map(cell => cell.setSnake());
    this.head = head.setSnake();
    this.direction = direction;
  }

  public move(cell: Cell) {
    this.body[0].setBlank();

    this.body = [
      ...this.body.slice(1, this.body.length),
      this.head.setSnake()
    ];

    this.head = cell.setSnake();
  }

  public changeDirection(direction: Direction) {
    this.direction = direction;
  }

  public nextCellCoordinates(): Coordinates {
    switch (this.direction) {
      case Direction.Up:
        return {
          x: this.head.x,
          y: this.head.y - 1
        };
      case Direction.Down:
        return {
          x: this.head.x,
          y: this.head.y + 1
        };
      case Direction.Left:
        return {
          x: this.head.x - 1,
          y: this.head.y
        };
      case Direction.Right:
        return {
          x: this.head.x + 1,
          y: this.head.y
        };
    }
  }

  private eat(food: Cell) {
      // TODO: =)
  }
}
