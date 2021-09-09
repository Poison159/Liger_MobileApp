import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResturantService } from '../services/resturants.service.ts/resturantService';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { Booking } from '../shared/booking';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  public branch: any;
  public booking = new Booking();
  public makeBooking: any;
  public already = new Array<any>();
  public alreadyBooked = new Array<any>();
  private branches : any[];
  private temp : any;
  private comment = "";
  private user: any;
  public alreadyRes = new Array<any>();
  public branchRes: any;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    private resturantServ: ResturantService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private storage : Storage
    ) { 

    this.route.queryParams.subscribe(params => {
      if (params && params.resturant) {
          this.branch = JSON.parse(params.resturant);
          this.user = JSON.parse(params.user);
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
        this.getUserRating(this.user);
        this.getUserReservations(this.user.Email);
      });
    }else{
      this.getUserRating(this.temp._user);
      this.getUserReservations(this.temp._user.Email);
    }
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

  //Ratings
  changeRated(branchId){
    this.branch.open = true;
  }

  cancelRating(branchId){
    this.branch.open = false;
  }

  onRateChange(event,branchId){
    this.branch.rating = event;
  }

  async submitRating(){
    let rating = this.branch.rating
    if(rating == 0 || !this.branch.openOrClosedInfo){alert('Please select rating and add comment before submiting');}
    else{
      const loading = await this.loadingController.create({
        message: 'Submiting rating',
        duration: 3000,
      });
      loading.present();
      this.resturantServ.addRating(this.branch.openOrClosedInfo,this.user.Id,rating, this.branch.id)
      .subscribe( async res => {
        if(res){
          this.already.push(this.branch.id);
          this.storage.set('localRated',this.already);
          const toast = await this.toastController.create({
            message: 'Thanks, we got your rating 😉',
            duration: 2000,
            position: 'middle'
          });
          loading.dismiss();
          toast.present();
          
        }else{
          this.already.push(this.branch.id);
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


  //Bookings
// ------------------------------------------Reservations -----------------------------------------------------------
navigateToBookingModel()
{
  if(!this.UserHasReservation()){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(this.user),
        branch: JSON.stringify(this.branch),
        booking: JSON.stringify(this.booking),
        temp: JSON.stringify(this.temp),
        sourcePage : JSON.stringify('category')
      }
    }

    //Make new reservation modal
    this.router.navigate(['reservation-form-modal'], navigationExtras);
  }else{

    const navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(this.user),
        branch: JSON.stringify(this.branch),
        existingReservation : JSON.stringify(this.alreadyRes),
        sourcePage : JSON.stringify('category')
      }
    }

    //Cancel reservation modal
    this.router.navigate(['reservation-modal'], navigationExtras);
  }
}

//Checks if object is defined and not null #Sibo
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

//----------------------------------------------------------------------------------------------------------------------------------
  createBooking(){
    this.makeBooking = true;
  }

  details(category){
    let meals = null;
    if(category == "Special"){
      meals = this.branch.branchMeals;
    }else{
      meals = this.branch.resturant.meals[category];
    }     
    const navigationExtras: NavigationExtras = {
      queryParams: {
        meals: JSON.stringify(meals),
        specials: JSON.stringify(this.branch.branchMeals),
        category: category
      }
    }
    this.router.navigate(['details'],navigationExtras);
  }
}
