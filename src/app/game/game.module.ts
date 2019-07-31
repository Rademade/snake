import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { UserNameDialogComponent } from './user-name-dialog/user-name-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    GameComponent,
    UserNameDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    GameComponent
  ],
  entryComponents: [
    UserNameDialogComponent
  ]
})
export class GameModule { }
