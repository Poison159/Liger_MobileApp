import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ResturantService } from '../services/resturants.service.ts/resturantService';


@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.page.html',
  styleUrls: ['./reservation-modal.page.scss'],
})
export class ReservationModalPage implements OnInit {

  public pageSource : any;
  public userReservation : any;
  private userReservationArray : any;
  private user: any;
  public branch: any;

  constructor(private route: ActivatedRoute, public modalController: ModalController, public router: Router,
    private resturantServ: ResturantService,
    public loadingController: LoadingController,
    public toastController: ToastController) { 

      this.route.queryParams.subscribe(params => {
        if (params && params.branch) {
            this.branch = JSON.parse(params.branch);
            this.user = JSON.parse(params.user);
            this.userReservationArray = JSON.parse(params.existingReservation);
            this.pageSource = JSON.parse(params.sourcePage);
        }
      });
    }

  ngOnInit() {
    if(this.userReservationArray){
      this.userReservation = this.userReservationArray[0];
    }
  }

  async cancelBooking(){
//Send reservation details but with cancel status

const loading = await this.loadingController.create({
  message: 'Cancelling booking',
  duration: 3000,
});
loading.present();

console.log("ReservedDate = " +  this.userReservation.dateReservedAt + " and ReservedTime = " +  this.userReservation.timeReservedAt);

this.resturantServ.addReservation(this.user.Id, this.userReservation.branchId, this.userReservation.quantity, this.userReservation.phoneNumber, this.userReservation.dateReservedAt, this.userReservation.timeReservedAt)
.subscribe( async res => {
  if(!res.error){
    //this.alreadyBooked.push(this.branch.id);
    //this.storage.set('localRated',this.alreadyBooked);
    const toast = await this.toastController.create({
      message: 'Your booking was cancelled 😉',
      duration: 2000,
      position: 'middle'
    });
    loading.dismiss();
    toast.present();

    //Navigate to cancel page
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
    message: 'Unknown error: could not cancel booking 😢',
    duration: 2000,
    position: 'middle'
  });
  toast.present();
},() => {});

    //Redirect to home
  }

  close()
  {
    //Navigate to cancel page
    const navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(this.user),
        resturant: JSON.stringify(this.branch)
      }
    }; 

    //NB: This routes back to category for now.
    this.router.navigate([this.pageSource], navigationExtras);

    //this.router.navigate(['home']);
  }



}
