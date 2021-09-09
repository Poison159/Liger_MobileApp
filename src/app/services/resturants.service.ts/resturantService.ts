import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ResturantService {
    //private Url                   = 'https://192.168.43.238:45456/api/';
    //https://localhost:44371/api/
    private Url                   = 'https://weboneapp.conveyor.cloud/api/';
    private resUrl                      = this.Url +'Branches';
    private searchUrl                   = this.Url +'Search';
    private ratinghUrl                  = this.Url +'Rating';
    private userRatingsUrl              = this.Url +'UserRatings';
    private userReservationUrl          = this.Url +'Reservation';
    private userReservationsUrl          = this.Url +'UserReservations';

    constructor(private _http: HttpClient){}

    //Actualling getting BranchByCode. A single Branch is return from the BranchesController
    getResturants(code: string){
        console.log('getting resturants ...');
        return this._http.get<any>(this.resUrl + '?code=' + code);
    }
    getAllResturantsNearMe(lat: string, lon: string){ 
        console.log('getting resturants ...');
        return this._http.get<any>(this.resUrl + '?userLocation=' + lon + ',' + lat + "&distance=" + 30);
    }

    serach(searchStr: string){  
        console.log('getting resturants ...');
        return this._http.get<any>(this.searchUrl + '?searchStr=' + searchStr);
    }

    addRating(comment,userId, rating, branchId){
        console.log('adding rating  ...');
        return this._http.get<any>(this.ratinghUrl + '?userId=' + userId +
         '&userRating=' + rating + '&branchId=' + branchId + '&comment=' + comment);
    }

    getUserRatings(userId){
        console.log('adding rating  ...');
        return this._http.get<any>(this.userRatingsUrl + '?userId=' + userId);
    }

    addReservation(userId, branchId, quantity, mobileNumber, dateReserved, timeReserved){
        console.log('adding reservation  ...');
        return this._http.get<any>(this.userReservationUrl + '?userId=' + userId + '&branchId=' + branchId + '&quantity=' + quantity
        + '&mobileNumber=' + mobileNumber + '&dateReserved=' + dateReserved + '&timeReserved=' + timeReserved);
    }

    getUserReservations(userEmail:any,brachId:number){
        console.log('getting reservation  ...');
        return this._http.get<any>(this.userReservationsUrl + '?email=' + userEmail + '&branchId=' + brachId);
      }
}