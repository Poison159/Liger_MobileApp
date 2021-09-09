import { Component, OnInit } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from "@aspnet/signalr"
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public _hubConnecton: HubConnection;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
      
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
      this.checkToken();
    });
  }

  checkToken(){
    this.storage.get('lg-token').then(res => {
      if(!res){
          this.router.navigate(['landing']);
      }
    });
  }
}
