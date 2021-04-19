import { Component, OnInit } from '@angular/core';
import{ViewChild} from '@angular/core'
import { FlashMessagesService } from 'angular2-flash-messages';
import {Client} from '../../models/Client'
import {ClientService} from '../../services/client.service'
import {SettingsService} from '../../services/settings.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {   
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm') form: any;
  constructor(private _flashMessagesService: FlashMessagesService, private clientService: ClientService, private router: Router, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    // if we are currently disabling the balance on add, then we'll set to balance to zero
    // otherwise, the balance will come through as NaN
    if(this.disableBalanceOnAdd){
      value.balance = 0
    }
    if(!valid){
      this._flashMessagesService.show("Please fill out form correctly", {
        cssClass: 'alert-danger', timeout: 4000
      })
    }else{
      // add client
      this.clientService.addClient(value)
      //show flash message
      this._flashMessagesService.show("New Client added", {
        cssClass: 'alert-success', timeout: 4000
      })
      // redirect to dashboard
      this.router.navigate(['/'])
    }
  }

}
