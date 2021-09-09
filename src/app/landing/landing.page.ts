import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  imgPath = '../../assets/icon.png';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  Register() {
    this.router.navigate(['register']);
  }

  LogIn() {
    this.router.navigate(['login']);
  }
}
