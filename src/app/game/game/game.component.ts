import { Component, OnInit, Inject } from '@angular/core';
import Snake, { Direction } from './snake';
import Board from './board';
import { FoodGenerator } from './food-generator';
import { Cell } from './cell';
import { interval, Subscription, fromEvent, Observable, Subject, VirtualTimeScheduler } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserNameDialogComponent, UserNameDialogData } from '../user-name-dialog/user-name-dialog.component';

export interface GameOptions {
  width: number;
  height: number;
}


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  snake: Snake;
  private board: Board = new Board(20, 20);
  points = 0;
  foodCell: Cell;
  gameOptions: GameOptions;
  snakeMovement$: Subscription;
  foodGeneration$: Subscription;
  keyPressed$: Observable<Event> = fromEvent(document, 'keydown');
  foodGenerator: FoodGenerator = new FoodGenerator();
  username: string;

  constructor(private db: AngularFirestore, private dialog: MatDialog) { }

  ngOnInit() {
    this.initSnake();
    this.subscribeToKeypress();
    this.subscribeToSpacePressed();
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
    this.openDialog();
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

  private subscribeToKeypress() {
    this.keyPressed$
      .pipe(filter((event: KeyboardEvent) => this.isArrowKeyPressed(event.key) ))
      .subscribe(event => {
        if (this.snake) {
          this.snake.changeDirection(this.getDirection(event.key));
        }
      });
  }

  private subscribeToSpacePressed() {
    this.keyPressed$
      .pipe(filter((event: KeyboardEvent) => event.code === 'Space'))
      .subscribe((event: KeyboardEvent) => {
        this.isStarted() ? this.stop() : this.start();
      });
  }

  private initSnake() {
    const snakeHeadX = Math.round(this.board.width / 2);
    const snakeHeadY = Math.round(this.board.height / 2);
    this.snake = new Snake(
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

  private openDialog() {
    const dialogRef = this.dialog.open(UserNameDialogComponent, {
      width: '250px',
      data: {
        name: ''
      }
    });

    dialogRef.afterClosed().subscribe((data: UserNameDialogData) => {
      this.username = data.name;
      this.db.collection('players').add({
        name: data.name,
        score: this.points,
        timeSpended: 0,
        createdAt: new Date()
      });
      this.startNewGame();
    });

  }

  private startNewGame() {
    this.board.clearBoard();
    this.points = 0;
    this.initSnake();
  }
}
