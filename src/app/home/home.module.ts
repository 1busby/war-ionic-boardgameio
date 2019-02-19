import { BoardComponent } from './../board/board.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxInitModule } from 'ngx-init';
import { BoardgameIoModule } from 'boardgame.io-angular';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    BoardgameIoModule,
    NgxInitModule
  ],
  declarations: [
    HomePage,
    BoardComponent
  ],
  entryComponents: [BoardComponent]
})
export class HomePageModule {}
