import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages'
import {Router} from '@angular/router'
import {SettingsService} from '../../services/settings.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(private authService:AuthService,private _flashMessagesService:FlashMessagesService, private router:Router, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.showRegister = this.settingsService.getSettings().allowRegistration
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn = false;
      }
    })
  }

  onLogoutClick(){
    this.authService.logout()
    this._flashMessagesService.show('You are now logged out', {
      cssClass: 'alert-success', timeout: 4000
    })
    this.router.navigate(['/login']);
  }
}
