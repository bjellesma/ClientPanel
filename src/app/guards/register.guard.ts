import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router'
import {SettingsService} from '../services/settings.service'

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate {
  

  constructor(private router: Router, private settingsService: SettingsService) { }

  canActivate(): boolean{
      if(this.settingsService.getSettings().allowRegistration){
          return true;
      }else{
          this.router.navigate(['/login'])
          return false;
      }
  }
}
