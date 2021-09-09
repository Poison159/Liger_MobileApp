import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  constructor() { }
  private howHidden = false;
  private freqAskedHidden = false;
  ngOnInit() {
  }
  setHowTrue(){
    this.howHidden = !this.howHidden;
  }
  setFreqAskedTrue(){
    this.freqAskedHidden = !this.freqAskedHidden;
  }

}
