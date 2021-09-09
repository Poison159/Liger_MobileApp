import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/resturants.service.ts/userService';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LogInPage implements OnInit {

  private email : string;
  private password : string;
  private confirmPassword : string;
  private errMessage: string;
  imgPath = '../../assets/icon.png';
  constructor(private authService: UserService ,private loadingController: LoadingController,
    public router: Router, private storage: Storage, private toastController : ToastController) { }

  
  ngOnInit() {
  }

  async LogIn(){
    const loading = await this.loadingController.create({
      message: 'logging in user...'
    });
    loading.present();
    this.authService.Login(this.email, this.password)
    .subscribe(
      (obj) => {
        if(this.CheckToken(obj)){
          loading.dismiss();
          this.getAndStoreToken(obj);
          const navigationExtras: NavigationExtras = {
            queryParams: {
              token: JSON.stringify(obj)
            }
          }; 
          this.router.navigate(['home'],navigationExtras);
        }else{
          let toast = this.toastController.create({
            message: obj.Errors,
            duration: 2000
          }).then(res => {res.present();});
          loading.dismiss();
        }
    },
      (err: any) => {
        console.log(err);
        this.errMessage = 'Server not found';
        loading.dismiss();
      },
      () => {
        console.log('Registration done!');
        loading.dismiss();
      }
    );
  }

  CheckToken(token: any) {
    if(token.Errors)
      return false;
    else
      return true
  }
  getAndStoreToken(token:any){
    this.storage.set('lg-token', token);
    this.storage.set('localRated', token._user.MobileNumber);
  }
}
