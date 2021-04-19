import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages'
import {Router, ActivatedRoute, Params} from '@angular/router'
import {SettingsService} from '../../services/settings.service'
import {Settings} from '../../models/Settings'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService,
    private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings()
  }

  onSubmit(){
    this.settingsService.changeSettings(this.settings)
    this._flashMessagesService.show('Settings Saved!',{
      cssClass: 'alert-success', timeout: 4000
    })
  }

}
