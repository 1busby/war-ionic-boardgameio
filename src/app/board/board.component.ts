import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

import { AnimationService, AnimationBuilder } from 'css-animator';
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
  private animatorB1: AnimationBuilder;
  private animatorB2: AnimationBuilder;
  @ViewChild('card1') card1;
  @ViewChild('card2') card2;
  constructor(
    private animationService: AnimationService,
    private platform: Platform,
    private toastController: ToastController
    ) {
    this.animatorB1 = animationService.builder();
    this.animatorB2 = animationService.builder();
    this.screenHeight = platform.height();
    this.screenWidth = platform.width();
  }

 animateCard1() {
  this.animatorB1
    .setType('bounceInDown')
    .setOptions({
      fixed: true,
      pin: false
  }).animate(this.card1.nativeElement);
  }


  animateCard2() {
    this.animatorB2
      .setType('bounceInUp')
      .setOptions({
        fixed: true,
        pin: false
    }).animate(this.card2.nativeElement);
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
    this.animateCard1();
    this.animateCard2();
    if (this.G.war) {
      //debugger
      this.warToast = await this.toastController.create({
        cssClass: 'customToast',
        message: 'WAR',
        position: 'middle',
        translucent: true,
        color: 'light',
      });
      this.warToast.present();
    } else {
      this.warToast.dismiss();
    }
  }

}
