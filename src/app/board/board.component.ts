import { Component, OnInit, Input } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

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
  warToast;

  constructor(
    private platform: Platform,
    private toastController: ToastController
    ) {
    this.screenHeight = platform.height();
    this.screenWidth = platform.width();
  }

  ngOnInit() {
    this.moves.newGame();
  }

  async onClick() {
    if (!this.G.war) {
      this.moves.play();
    } else {
      this.moves.playWar();
    }

    if (this.G.war) {
      debugger
      this.warToast = await this.toastController.create({
        message: 'WAR',
        position: 'middle',
        translucent: true
      });
      this.warToast.present();
    } else {
      this.warToast.dismiss();
    }
  }
}
