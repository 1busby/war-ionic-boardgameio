import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-board',
  templateUrl:  './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() G: any;
  @Input() ctx: any;
  @Input() moves: any;
  @Input() events: any;
  @Input() playerID: string;
  @Input() isActive: boolean;
  @Input() isMultiplayer: boolean;
  @Input() isConnected: boolean;
  @Input() isPreview: boolean;

  screenWidth;
  screenHeight;

  constructor(private platform: Platform) {
    this.screenHeight = platform.height();
    this.screenWidth = platform.width();
  }

  ngOnInit() {
    this.moves.newGame();
  }

  onClick() {
    if (!this.G.war) {
      this.moves.play();
    } else {
      this.moves.playWar();
    }
  }
}
