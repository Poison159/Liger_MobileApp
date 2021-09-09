import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ResturantService } from '../services/resturants.service.ts/resturantService';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-reservation-form-modal',
  templateUrl: './reservation-form-modal.page.html',
  styleUrls: ['./reservation-form-modal.page.scss'],
})
export class ReservationFormModalPage implements OnInit {

  public branch: any;
  private temp : any;
  private user: any;
  public booking : any;
  public alreadyBooked = new Array<any>();
  public pageSource : any;  

  constructor(private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    private resturantServ: ResturantService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private storage : Storage
    ) { 

    this.route.queryParams.subscribe(params => {
      if (params && params.branch) {
          this.branch = JSON.parse(params.branch);
          this.user = JSON.parse(params.user);
          this.booking = JSON.parse(params.booking);
          this.pageSource = JSON.parse(params.sourcePage);
          if(params.temp)
            this.temp = JSON.parse(params.temp);
          this.user = this.temp._user;
      }
    });
  }

  ngOnInit() {
  }

  //What is this used for?
  cancelBooking(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  async submitBooking(){

    if(this.booking.Quantity < 0)
    {
      alert('Please select correct quantity');
    }
    else if(this.booking.Mobile == "")
    {
      alert('Please fill in all the fields');
    }
    else{
      const loading = await this.loadingController.create({
        message: 'Submiting booking',
        duration: 3000,
      });
      loading.present();
     
      console.log("ReservedDate = " +  this.booking.Date + " and ReservedTime = " +  this.booking.Time);

      this.resturantServ.addReservation(this.user.Id, this.branch.id, this.booking.Quantity, this.booking.Mobile, this.booking.Date,this.booking.Time)
      .subscribe( async res => {
        if(!res.error){
          this.alreadyBooked.push(this.branch.id);
          this.storage.set('localRated',this.alreadyBooked);
          const toast = await this.toastController.create({
            message: 'Thanks, we got your booking 😉',
            duration: 2000,
            position: 'middle'
          });
          loading.dismiss();
          toast.present();
          
          //Navigate back to were you added the reservation from
          const navigationExtras: NavigationExtras = {
            queryParams: {
              user: JSON.stringify(this.user),
              resturant: JSON.stringify(this.branch)
            }
          }; 
      
          //NB: This routes back to category for now.
          this.router.navigate([this.pageSource], navigationExtras);
      
        }else{
          //this.already.push(this.branch.id);
          //this.storage.set('localRated',this.already);
          const toast = await this.toastController.create({
            message: res.error,
            duration: 2000,
            position: 'middle'
          });
          loading.dismiss();
          toast.present();
        }
      },async (error: any) => {
        const toast = await this.toastController.create({
          message: 'Unknown error: could not add booking 😢',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      },() => {});
    }
  }



}
