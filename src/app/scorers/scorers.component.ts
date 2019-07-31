import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from './player';

@Component({
  selector: 'app-scorers',
  templateUrl: './scorers.component.html',
  styleUrls: ['./scorers.component.css']
})
export class ScorersComponent implements OnInit {
  topPlayers$: any;
  displayedColumns: string[];

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.displayedColumns = ['name', 'score'];
    this.topPlayers$ =  this.db.collection<Player>('players', ref => ref.orderBy('score', 'desc').limit(10)).valueChanges();
  }

}
