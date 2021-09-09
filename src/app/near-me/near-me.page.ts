import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, ToastController, LoadingController } from '@ionic/angular';
import { ResturantService } from '../services/resturants.service.ts/resturantService';
import {Storage} from '@ionic/storage';
import { Booking } from '../shared/booking';

@Component({
  selector: 'app-near-me',
  templateUrl: './near-me.page.html',
  styleUrls: ['./near-me.page.scss'],
})
export class NearMePage implements OnInit {
  public branch: any;
  private branches : any[];
  private temp : any;
  private comment = "";
  private user: any;
  private already = new Array<any>();
  public branchRes: any;
  public booking = new Booking();
  public alreadyRes = new Array<any>();

  rated = 0;
  rate = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage : Storage,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private geolocation: Geolocation,
    private resturantServ: ResturantService,
    private platform: Platform) {
      
      this.route.queryParams.subscribe(params => {
        if (params && params.branches) {
          this.branches = JSON.parse(params.branches);
          if(params.temp)
            this.temp = JSON.parse(params.temp);
          this.user = this.temp._user;
        }
      });
     }

  ngOnInit() {
    if(!this.temp){
      this.storage.get("lg-token").then(res => {
        this.user = res._user;
      });
    }
  }

  IdFromString(rated: string){
    let ints = new Array<number>();
    rated.split(',').forEach(obj => {
      ints.push(+obj);
    });
    return ints;
  }

  async getUserRating(user){
    const loading = await this.loadingController.create({
      message: 'fetching user ratings',
      duration: 3000,
    });
    loading.present();
    this.resturantServ.getUserRatings(user.Id)
    .subscribe((res : Array<any>) => {
      this.already = res;
      loading.dismiss();
    },(error: any) => {

    },() => {});
  }

  changeRated(branchId){
    this.branches.filter(x => x.id == branchId)[0].open = true;
  }

  onRateChange(event,branchId){
    this.branches.filter(x => x.id == branchId)[0].rating = event;
  }

  async submitRating(branchId){
    let branch = this.branches.filter(x => x.id == branchId)[0]
    let rating = branch.rating
    if(rating == 0 || !branch.openOrClosedInfo){alert('Please select rating and add comment before submiting');}
    else{
      const loading = await this.loadingController.create({
        message: 'Submiting rating',
        duration: 3000,
      });
      loading.present();
      this.resturantServ.addRating(branch.openOrClosedInfo,this.user.Id,rating, branchId)
      .subscribe( async res => {
        if(res){
          this.already.push(branchId);
          this.storage.set('localRated',this.already);
          const toast = await this.toastController.create({
            message: 'Thanks, we got your rating 😉',
            duration: 2000,
            position: 'middle'
          });
          loading.dismiss();
          toast.present();
          
        }else{
          this.already.push(branchId);
          this.storage.set('localRated',this.already);
          const toast = await this.toastController.create({
            message: 'You have already rated resturant 👍',
            duration: 2000,
            position: 'middle'
          });
          loading.dismiss();
          toast.present();
        }
      },async (error: any) => {
        const toast = await this.toastController.create({
          message: 'could not add rating 😢',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      },() => {});
    }
  }

  //-----Reservation------//

  isEmpty(obj:any) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

//Gets existing user reservation #Sibo
getUserReservations(userEmail:string){
  this.resturantServ.getUserReservations(userEmail,this.branch.id)
  .subscribe((res:any) => {
    this.alreadyRes = res;
    this.branchRes  = this.alreadyRes.filter(x => x.branchId === this.branch.id)[0]
  },(error: any) => {

  },() => {});
}

//Checks if a user already has an active reservation for the future
UserHasReservation(){

  let res = JSON.parse(localStorage.getItem("lg-token") || '{}');
  
  this.getUserReservations(this.user.Email); //Not working #Sibo

  let result = false;
  if(!this.isEmpty(this.branchRes) && this.branchRes !== undefined){
    //No need for the below check. Already checked on the serverSide #Sibo
      //if(this.branchRes.email == this.user.Email && new Date(this.branchRes.dateReservedAt) < new Date()){
        result = true;
      //}
  }
  return result;
}

  navigateToBookingModel(selectedBranch)
{
  if(!this.UserHasReservation()){
    this.branch = selectedBranch;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(this.user),
        branch: JSON.stringify(this.branch),
        booking: JSON.stringify(this.booking),
        temp: JSON.stringify(this.temp),
        sourcePage : JSON.stringify('near-me')
      }
    }
    this.router.navigate(['reservation-form-modal'], navigationExtras);
  }else{
    
    const navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(this.user),
        branch: JSON.stringify(this.branch),
        existingReservation : JSON.stringify(this.alreadyRes),
        sourcePage : JSON.stringify('near-me')
      }
    }

    //Cancel reservation modal
    this.router.navigate(['reservation-modal'], navigationExtras);
  }

}
  
  details(category, id){
    let meals = null;
    let branch = this.branches.filter(x => x.id == id)[0];
    if(category == "Special"){
      meals = branch.branchMeals;
    }else{
      meals = branch.resturant.meals[category];
    }     
    const navigationExtras: NavigationExtras = {
      queryParams: {
        meals: JSON.stringify(meals),
        specials: JSON.stringify(branch.branchMeals),
        category: category
      }
    }
    this.router.navigate(['details'],navigationExtras);
  }
  
  maps(branchAddress: string){
    this.geolocation.getCurrentPosition().then((resp) => {
    window.location.href = 'http://maps.google.com/maps?saddr=' +
    resp.coords.latitude.toString() + ', ' + resp.coords.longitude.toString()
    + '&daddr=' + encodeURIComponent(branchAddress);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
