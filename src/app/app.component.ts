import { Component, OnInit } from '@angular/core';
import Board from './components/board';
import Snake from './components/snake';
import Game, { GameOptions } from './components/game';
import { HostListener } from '@angular/compiler/src/core';
import { Observable, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'snake';
  board: Board;
  snake: Snake;
  game: Game;

  constructor() {
    const gameOptions = {
      width: 10,
      height: 10
    } as GameOptions;

    this.game = new Game(gameOptions);
    this.board = this.game.board;
  }

  ngOnInit() {
    this.subscribeToSpacePressed();
  }

  private subscribeToSpacePressed() {
    fromEvent(document, 'keydown')
      .pipe(filter((event: KeyboardEvent) => event.code === 'Space' ))
      .subscribe((event: KeyboardEvent) => {
        this.game.isStarted() ? this.game.stop() : this.game.start();
      });
  }
}
