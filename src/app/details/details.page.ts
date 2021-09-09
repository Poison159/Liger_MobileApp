import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResturantService } from '../services/resturants.service.ts/resturantService';
import { LoadingController, ToastController } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private meals: any;
  private category: any;
  private specials: any;
  private already = new Array<any>();
  private branches : any[];
  private temp : any;
  private comment = "";
  private user: any;

  constructor(private route: ActivatedRoute,
    private resturantServ: ResturantService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private decimalPipe: DecimalPipe,
    private storage : Storage,
    ) { 
    
    this.route.queryParams.subscribe(params => {
      if (params && params.meals) {
          this.meals = JSON.parse(params.meals);
          this.meals.forEach(meal => {
            meal.price = this.decimalPipe.transform(meal.price, '1.2-2');
          });
          this.specials = JSON.parse(params.meals);
          this.category = params.category;
      }
    });
  }

  ngOnInit() {
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

}
