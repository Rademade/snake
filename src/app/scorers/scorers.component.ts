import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from './player';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scorers',
  templateUrl: './scorers.component.html',
  styleUrls: ['./scorers.component.css']
})
export class ScorersComponent implements OnInit {
  topPlayers$: any;
  displayedColumns: string[];
  dataSource$: Observable<MatTableDataSource<Player[]>>;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.displayedColumns = ['name', 'score'];
    this.dataSource$ = this.db.collection<Player[]>(
      'players', ref => ref.orderBy('score', 'desc').limit(10)
    ).valueChanges().pipe(map(data => new MatTableDataSource(data)));
  }

}
