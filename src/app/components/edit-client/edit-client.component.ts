import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'
import {Client} from '../../models/Client'
import {ClientService} from '../../services/client.service'
import {FlashMessagesService} from 'angular2-flash-messages'
import {SettingsService} from '../../services/settings.service'

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnEdit: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit
    // get id from url
    this.id = this.route.snapshot.params['id']
    //get client
    this.clientService.getClient(this.id).subscribe(client => {
        this.client = client
    })
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}){
    if(!valid){
      this._flashMessagesService.show('Please fill out the form correctly',{
        cssClass: 'alert-danger', timeout: 4000
      })
    }else{
      //add id to client
      //id will already be there because we will have gotten it from the url
      value.id = this.id
      this.clientService.updateClient(value)
      this._flashMessagesService.show('Client Updated',{
        cssClass: 'alert-success', timeout: 4000
      })
      this.router.navigate([`/client/${this.id}`])
    }
  }

  
}
