import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-mod',
  templateUrl: './log-mod.page.html',
  styleUrls: ['./log-mod.page.scss'],
})
export class LogModPage implements OnInit {

  constructor(public modalController: ModalController, private storage: Storage, private router: Router, private platform: Platform) { }

  ngOnInit() {
  }

  dismiss(){
    this.dms();
  }

  dms() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  LogOut() {
    this.storage.clear();
    this.dms();
    this.router.navigate(['landing']);
  }
}
