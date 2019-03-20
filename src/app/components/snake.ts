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

  constructor(head: Cell, body: Cell[], direction: Direction) {
    this.body = body;
    this.head = head;
    this.direction = direction;
  }

  public move(cell: Cell) {
    this.body[0].setBlank();
    delete this.body[0];

    this.body.push(this.head);
    cell.setSnake();
    this.head = cell;
  }

  public changeDirection(direction: Direction) {
    this.direction = direction;
  }

  private eat(food: Cell) {
      // TODO: =)
  }
}
