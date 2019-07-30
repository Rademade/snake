import Snake, { Direction } from './snake';
import Board from './board';
import { FoodGenerator } from './food-generator';
import { Cell } from './cell';
import { interval, Subscription, fromEvent, Observable, Subject, VirtualTimeScheduler } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface GameOptions {
  width: number;
  height: number;
}
export default class Game {
  snake: Snake;
  board: Board;
  points = 0;
  foodCell: Cell;
  gameOptions: GameOptions;
  snakeMovement$: Subscription;
  foodGeneration$: Subscription;
  foodGenerator: FoodGenerator;

  constructor(gameOptions: GameOptions) {
    this.gameOptions = gameOptions;
    this.board = new Board(gameOptions.width, gameOptions.height);
    this.snake = this.initSnake();
    this.foodGenerator = new FoodGenerator();
    this.keypressSub();
  }

  public start() {
    this.snakeMovement$ = this.startSnakeMovement();
    this.foodGeneration$ = this.startFoodGeneration();
  }

  public stop() {
    this.snakeMovement$.unsubscribe();
    this.foodGeneration$.unsubscribe();
  }

  public gameOver() {
    this.stop();
    if (confirm('Game over. Start again?')) {
      console.log(this.board);
      this.board.clearBoard();
      this.points = 0;
      this.snake = this.initSnake();
    }
  }

  public isStarted() {
    if (!this.snakeMovement$ || this.snakeMovement$.closed) {
      return false;
    } else {
      return true;
    }
  }

  private startSnakeMovement(speed: number = 250): Subscription {
    return interval(speed).subscribe(() => {
      const nextCell = this.board.getCell(this.snake.nextCellCoordinates());
      if (!nextCell || nextCell.isSnake()) {
        this.gameOver();
      } else if (nextCell.isFood()) {
        this.snake.eat(nextCell);
        this.points += 1;
        this.snakeMovement$.unsubscribe();
        this.snakeMovement$ = this.startSnakeMovement(250 - this.points * 10);
      } else {
        this.snake.move(nextCell);
      }
    });
  }

  private startFoodGeneration(): Subscription {
    return interval(5000).subscribe(() => {
      if (this.foodCell && this.foodCell.isFood()) {
        this.foodCell.setBlank();
      }
      this.foodCell = this.foodGenerator.place(this.board);
    });
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
