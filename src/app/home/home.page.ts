import { Component } from '@angular/core';
import { MyGame } from '../game';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title = 'bgio-test2';
  game = MyGame;               // <-- notice that we need to expose the object to the template
  board = BoardComponent;
}
