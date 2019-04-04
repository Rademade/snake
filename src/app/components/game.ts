import Snake, { Direction } from './snake';
import Board from './board';
import { Cell } from './cell';
import { interval, Subscription, fromEvent, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface GameOptions {
  width: number;
  height: number;
}
export default class Game {
  snake: Snake;
  board: Board;
  gameOptions: GameOptions;
  game$: Subscription;

  constructor(gameOptions: GameOptions) {
    this.gameOptions = gameOptions;
    this.board = new Board(gameOptions.width, gameOptions.height);
    this.snake = this.initSnake();
    this.keypressSub();
  }

  public start() {
    this.game$ = interval(500).subscribe(() => {
      const nextCell = this.board.getCell(this.snake.nextCellCoordinates());
      this.snake.move(nextCell);
    });
  }

  public stop() {
    this.game$.unsubscribe();
  }

  private keypressSub() {
    fromEvent(document, 'keydown')
      .pipe(filter((event: KeyboardEvent) => this.isArrowKeyPressed(event.key) ))
      .subscribe(event => {
        this.snake.changeDirection(this.getDirection(event.key));
      });
  }
  private initSnake() {
    const snakeHeadX = Math.round(this.board.width / 2);
    const snakeHeadY = Math.round(this.board.height / 2);
    return new Snake(
      this.board.cells[snakeHeadY][snakeHeadX],
      [
        this.board.cells[snakeHeadY][snakeHeadX - 2],
        this.board.cells[snakeHeadY][snakeHeadX - 1],
      ]
    );
  }

  private isArrowKeyPressed(key: string): boolean {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key);
  }

  private getDirection(key: string): Direction {
    switch (key) {
      case 'ArrowLeft':
        return Direction.Left;
      case 'ArrowUp':
        return Direction.Up;
      case 'ArrowDown':
        return Direction.Down;
      case 'ArrowRight':
        return Direction.Right;
    }
  }
}
