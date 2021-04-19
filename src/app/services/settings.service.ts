import { Injectable } from '@angular/core';
import {Settings} from '../models/Settings'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false
  }

  constructor() {
    if(localStorage.getItem('settings') != null){
      // get from local storage if possible
      this.settings = JSON.parse(localStorage.getItem('settings'))
    }
  }

  getSettings(): Settings{
    return this.settings
  }

  changeSettings(settings : Settings): void{
    // store also in local storage
    localStorage.setItem('settings', JSON.stringify(settings))
    this.settings = settings
  }
}
