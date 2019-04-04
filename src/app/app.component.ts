import { Component } from '@angular/core';
import Board from './components/board';
import Snake from './components/snake';
import Game, { GameOptions } from './components/game';
import { HostListener } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
    this.game.start();
  }
}
