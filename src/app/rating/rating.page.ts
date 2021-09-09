import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from '../services/resturants.service.ts/userService';
import { ToastController, LoadingController } from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {
  private nameChange: any;
  private username : any;
  private user : any;
  
  constructor(public route: ActivatedRoute,
    private router: Router,
    private storage : Storage,
    private userServ: UserService,
    public loadingController: LoadingController,
    public toastController: ToastController) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.userName) {
        this.username = params.userName;
        this.user = JSON.parse(params.user);
      }
    });
  }

  ngOnInit() {
  }

  async submit(){
    
    const loading = await this.loadingController.create({
      message: 'Saving username...',
      duration: 5000
    });
    loading.present();
    this.userServ.changeName(this.user.Id,this.username)
    .subscribe( async (res : any) => {
      if(res == true){
        const toast = await this.toastController.create({
          message: 'Name Changed ✔',
          duration: 2000,
          position: 'middle'
        });
        loading.dismiss();
        this.storage.get("lg-token").then(token => {
          this.nameChange = token;
          if(this.nameChange){
            this.nameChange._user.Name = this.username;
            this.storage.set("lg-token", this.nameChange);
          } 
        });
        toast.present();
      }else{
        const toast = await this.toastController.create({
          message: 'Could not change name ❌',
          duration: 2000,
          position: 'middle'
        });
        loading.dismiss();
        toast.present();
      }
    },(err: any) => {

    },() => {});
    
    const navigationExtras: NavigationExtras = {
      queryParams: {
        userName: this.username
      }
    }
    this.router.navigate(['home'],navigationExtras);
  }

  save(){
         
  }
  
}
